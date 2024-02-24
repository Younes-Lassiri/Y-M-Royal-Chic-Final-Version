import React, { useEffect, useState } from 'react';
import './Orders.css';
import Loader from '../Loader/Loader';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/orders')
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
                setLoading(false); 
            });
    }, []);

    return (
        <>
            {loading ? (
                <div style={{color:'#000009', fontSize:'20px', fontWeight:600}}>Loading...</div> // Show loading message while data is being fetched
            ) : orders.length > 0 ? (
                <div className='order-section container'>
                    <div className='row'>
                        <div className='col-12'>
                        <table>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #000009' }}>
                                <th>No.</th>
                                <th>Customer</th>
                                <th>Total($)</th>
                                <th>Date</th>
                                <th>Email</th>
                                <th>Items</th>
                                <th>Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.length > 0 ? orders
                        .map((ord, i) => (
                            <tr key={i}>
                                <td style={{ color: '#000009' }}>{ord.orderId}</td>
                                <td>{ord.clientName}</td>
                                <td style={{ color: 'green' }}>${ord.clientTotalPaid.toLocaleString('en-US')}</td>
                                <td style={{ color: '#727272' }}>{new Date(ord.created_at).toLocaleDateString()}</td>
                                
                                <td>{ord.clientContact}</td>
                                <td>{ord.clientItems}</td>
                                <td>{ord.clientPayMethod}</td>
                                <td><button className='btn-danget'>Completed</button></td>
                            </tr>
                        )) : <h2>No orders for now</h2>}
                        </tbody>
                    </table>
                        </div>
                    </div>
                   
                </div>
            ) : (
                <div style={{color:'#f5f8f0', fontSize:'15px', fontWeight:600, margin:'auto'}}>Loading...</div>
            )}
        </>
    );
}


