import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Loading from '.././Loading';

const OrderInfo = () => {
    const [orderData, setorderData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllOrders = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/auth/allOrders");

          const data = await response.json();
          setorderData(data);

          setTimeout(() => {
            setLoading(false);
          }, 1500);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchAllOrders();
      }, []);
  return (
    <div>
    <Navbar />
    <br /> <br /> <br />
    <div className='container'>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h3 className="mt-4 mb-4">All Orders</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Item Name</th>
                <th>Item Qty</th>
                <th>Item Price</th>
                <th>Date</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order) => (
                <tr key={order._id}>
                  <td>{order.email}</td>
                  {order.order_data.map((item) => (
                    <React.Fragment key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                      <td>{new Date(item.Order_date).toLocaleDateString()}</td>
                      <td>{item.qty * item.price}</td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <br />
  </div>
  )
}

export default OrderInfo
