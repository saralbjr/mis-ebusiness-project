import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import Loading from '.././Loading';
import { Link } from 'react-router-dom';
import './Admin.css'

const OrderInfo = () => {
  const [orderData, setorderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/allOrders");
      const data = await response.json();

      // Sort the order data by ordered date in descending order
      const sortedOrders = data.sort((a, b) => new Date(b.order_data[0][0].Order_date) - new Date(a.order_data[0][0].Order_date));

      setorderData(sortedOrders);

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
      <AdminNavBar />
      <br /> <br /> <br /> <br /> <br/>
      <div className='btn-container d-flex justify-content-center'>
      <Link to="/admin" className='btn btn-success mx-2'>
       View Products
      </Link>
        <Link to="/admin/usersdata" className="btn btn-success">
          View Users
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='container'>
          <h3 className="fs-7 mt-4 mb-4 d-flex justify-content-center">User Orders</h3>
          {orderData.map((userOrder, index) => (
            <div key={index}>
              <h4>User: {userOrder.email}</h4>
              <table className="table">
                <thead>
                  <tr className='orderinfo'>
                    <th>Ordered Date</th>
                    <th>Item Name</th>
                    <th>Item Qty</th>
                    <th>Item Size</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrder.order_data.map((order, orderIndex) => (
                    <tr key={orderIndex}>
                      <td>{order.find((item) => item.Order_date)?.Order_date}</td>
                      <td>{order.find((item) => item.id)?.name}</td>
                      <td>{order.find((item) => item.id)?.qty}</td>
                      <td>{order.find((item) => item.id)?.size}</td>
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

export default OrderInfo;
