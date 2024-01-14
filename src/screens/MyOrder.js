import React, { useEffect, useState } from 'react';
// import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Loading from './Loading'; // Import the Loading component

export default function MyOrder() {
    const [orderData, setorderData] = useState({});
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
            setorderData(data);

            setTimeout(()=> {
                setLoading(false);
            }, 1500)
           // Set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // Set loading to false in case of an error
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

            <div className='container'>
                {loading ? (
                    // Display loading component while waiting for data
                    <Loading />
                ) : (
                    <div className='row'>
                        {orderData !== {} ? Array(orderData).map(data => {
                            return (
                                data.orderData ?
                                    data.orderData.order_data.slice(0).reverse().map((item) => {
                                        return (
                                            item.map((arrayData) => {
                                                return (
                                                    <div  >
                                                        {arrayData.Order_date ? <div className='m-auto mt-5'>
                                                            {data = arrayData.Order_date}
                                                            <hr />
                                                        </div> :
                                                            <div className='col-12 col-md-6 col-lg-3' >
                                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                            <span className='m-1'>{arrayData.qty}</span>
                                                                            <span className='m-1'>{arrayData.size}</span>
                                                                            <span className='m-1'>{data}</span>
                                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                                Rs. {arrayData.price}/-
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        )
                                    }) : ""
                            )
                        }) : ""}
                    </div>
                )}
            </div>
            <br/>
        </div>
    );
}
