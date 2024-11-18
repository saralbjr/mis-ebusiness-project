import React, { useState } from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import jsPDF from 'jspdf';

export default function Cart() {
  const [orderSuccess, setOrderSuccess] = useState(false);
  let data = useCart();
  let dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/auth/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
        payment_method: "COD" // Cash on Delivery as payment method
      })
    });

    if (response.status === 200) {
      generatePDF();
      dispatch({ type: "DROP" }); // Clear the cart
      setOrderSuccess(true); // Indicate success
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Header
    pdf.setFontSize(18);
    pdf.text('Order Bill', 20, 15);

    // Table Header
    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    pdf.setFillColor(52, 73, 94); // Dark Blue
    pdf.rect(20, 25, 165, 10, 'F');
    pdf.text('Item', 25, 30);
    pdf.text('Quantity', 75, 30);
    pdf.text('Amount', 150, 30);

    // Table Rows
    let yPos = 40;
    data.forEach((food, index) => {
      pdf.setFillColor(255, 255, 255); // White
      pdf.rect(20, yPos, 165, 10, 'F');

      pdf.setTextColor(52, 73, 94); // Dark Blue
      pdf.text(food.name, 25, yPos + 5);
      pdf.text(food.qty.toString(), 80, yPos + 5);
      pdf.text(`Rs.${food.price}`, 155, yPos + 5);

      yPos += 10;
    });

    // Total
    pdf.setFillColor(52, 73, 94); // Dark Blue
    pdf.rect(20, yPos, 165, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.text('Total Price', 120, yPos + 5);
    pdf.text(`Rs.${data.reduce((total, food) => total + food.price, 0)}`, 155, yPos + 5);

    // Download the PDF
    pdf.save('order_bill.pdf');
  };

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        {data.length === 0 && !orderSuccess ? (
          <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
        ) : (
          <table className='table table-hover'>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((food, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type='button'
                      className='btn p-0'
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {data.length > 0 && (
          <div>
            <h1 className='fs-2 mx-2'>
              Total Price: Rs.{data.reduce((total, food) => total + food.price, 0)}/-
            </h1>

            {/* Only display Checkout button */}
            <button className='btn bg-success mt-2 mx-2' onClick={handleCheckOut}>
              Check Out
            </button>
          </div>
        )}

        {orderSuccess && (
          <div className='text-center text-success fs-1 mt-3'>
            Your Order was successful!
          </div>
        )}
      </div>
    </div>
  );
}
