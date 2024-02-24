import React from 'react'
import './Messages.css'
import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/messages')
            .then((res) => res.json())
            .then((data) => {
                setMessages(data)
                console.log(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
    }, []);

    function calculateTimePassed(createdAt) {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
      
        const timeDifference = currentDate - createdDate;
        const secondsDifference = Math.floor(timeDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);
        const daysDifference = Math.floor(hoursDifference / 24);
      
        if (daysDifference > 0) {
          return `${daysDifference} days ago`;
        } else if (hoursDifference > 0) {
          return `${hoursDifference} hours ago`;
        } else if (minutesDifference > 0) {
          return `${minutesDifference} minutes ago`;
        } else {
          return `${secondsDifference} seconds ago`;
        }
      }

    return (
        <>
            {loading ? (
                <div style={{color:'#f5f8f0', fontSize:'20px', fontWeight:600, margin:'auto'}}>Loading...</div>
            ) : messages.length > 0 ? (
                <div className='noti-section container'>
                    <div className='row'>
                        <div className='col-12'>
                        <table>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message, i) => (
                                <tr key={i}>
                                    <td style={{display:'flex', alignItems:'center', gap:'15px'}}><div style={{display:'flex', flexDirection:'column'}}>{message.userName}</div></td>
                                    <td>{message.userEmail}</td>
                                    <td>{message.contactMessage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        </div>
                    </div>
                    
                </div>
            ) : (
                <div>No Messages For Now</div>
            )}
        </>
    );
}
