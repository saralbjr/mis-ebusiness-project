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
    <br /> <br /> <br /> <br/>
    {loading ? (
      <Loading />
    ) : (
      <div className='container'>
        <h3 className="mt-4 mb-4 d-flex justify-content-center">User Orders</h3>
        {orderData.map((userOrder, index) => (
          <div key={index}>
            <h4>User: {userOrder.email}</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item Name</th>
                  <th>Item Qty</th>
                  <th>Item Price</th>
                </tr>
              </thead>
              <tbody>
                {userOrder.order_data.map((order, orderIndex) => (
                  <tr key={orderIndex}>
                    <td>{order.find((item) => item.Order_date)?.Order_date}</td>
                    <td>{order.find((item) => item.id)?.name}</td>
                    <td>{order.find((item) => item.id)?.qty}</td>
                    <td>{order.find((item) => item.id)?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
          </div>
        ))}
      </div>
    )}
  </div>
);
};


export default OrderInfo
