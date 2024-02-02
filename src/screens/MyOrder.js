import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Loading from './Loading';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            const data = await response.json();
            setOrderData(data);

            setTimeout(() => {
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <br /> <br /> <br />
            <div className='container'>
                {loading ? (
                    <Loading />
                ) : (
                    <div className='row'>
                        {orderData !== {} ? (
                            Array(orderData).map(data => (
                                data.orderData ? (
                                    data.orderData.order_data.slice(0).reverse().map((item) => (
                                        item.map((arrayData) => (
                                            <div>
                                                {arrayData.Order_date ? (
                                                    <div className='m-auto mt-5'>
                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div>
                                                ) : (
                                                    <div className='col-12 col-md-6 col-lg-3'>
                                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                            <div className="card-body">
                                                                <h5 className="card-title">{arrayData.name}</h5>
                                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                    <span className='m-1'>{arrayData.qty}</span>
                                                                    <span className='m-1'>{arrayData.size}</span>
                                                                    <span className='m-1'>{data}</span>
                                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                        Rs. {arrayData.price}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ))
                                ) : (
                                    <div className="text-center mt-5">
                                        <h3>No Orders Yet</h3>
                                    </div>
                                )
                            ))
                        ) : (
                            <div className="text-center mt-5">
                                <h3>No Orders Yet</h3>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <br />
        </div>
    );
}
