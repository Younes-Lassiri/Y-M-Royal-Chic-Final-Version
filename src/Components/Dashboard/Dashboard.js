import React, { useEffect, useState } from 'react'
import './Dashboard.css'

export default function Dashboard() {
const [orders, setOrders] = useState([])

const [messages, setMessages] = useState([])

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

  



useEffect(() => {
    fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/orders')
    .then((res) => res.json())
    .then((data) => {
        setOrders(data)
    })

    fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/messages')
    .then((res) => res.json())
    .then((data) => {
        setMessages(data)
    })
}, [])

const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 5;
    const totalPages = Math.ceil(orders.length / ordersPerPage);



    const [currentPagem, setCurrentPagem] = useState(0);
    const ordersPerPagem = 5;
    const totalPagesm = Math.ceil(messages.length / ordersPerPagem);

    const handleClickNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleClickPrev = () => {
        setCurrentPage(currentPage - 1);
    };


    const handleClickNextm = () => {
        setCurrentPagem(currentPagem + 1);
    };

    const handleClickPrevm = () => {
        setCurrentPagem(currentPagem - 1);
    };
  return (
    <div className='dashboard-section container'>
        <div className='row'>
            <div className='col-7'>
            
            <table>
                <thead>
                    <tr>
                        <th>No. <img style={{width:'15px', height:'15px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR9JREFUSEvt1T0uBVEYxvHfFR8RvZoF0LMCFWEBOjRUKFW3pKNBYwPER2MJopLYgUhsgIKGOcmZZCJ3Zs4k9xQSU01m3jz/97wfz+nJ/PQy6+sK6MeEDlIT6wI4xF4UPsJ+CiQVEAR38RlFJ5AESQEcYxtfWImAG4zjBDtNJ2kChH+n2KiI30exJZSQc2zWQeoA4fsF1geIl1oBcodRBMgWvn+D6gAzeMYk1nBbk+EyroqGf2AOL6mAELeA6ViKpjKHBF7xOCgopckp01gb8w9oLV9TiRZjk69bVFaLEX3DQ5cmz+IJUy1jGjb7svCo92Jc57uMadMWD2XRSpGzXFZRLWc2s6tCqnY9grFh2nUJynrhVCHhPek2C4F/3yp+ACdVOhmcqPOBAAAAAElFTkSuQmCC"/></th>
                        <th>Customer <img style={{width:'15px', height:'15px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR9JREFUSEvt1T0uBVEYxvHfFR8RvZoF0LMCFWEBOjRUKFW3pKNBYwPER2MJopLYgUhsgIKGOcmZZCJ3Zs4k9xQSU01m3jz/97wfz+nJ/PQy6+sK6MeEDlIT6wI4xF4UPsJ+CiQVEAR38RlFJ5AESQEcYxtfWImAG4zjBDtNJ2kChH+n2KiI30exJZSQc2zWQeoA4fsF1geIl1oBcodRBMgWvn+D6gAzeMYk1nBbk+EyroqGf2AOL6mAELeA6ViKpjKHBF7xOCgopckp01gb8w9oLV9TiRZjk69bVFaLEX3DQ5cmz+IJUy1jGjb7svCo92Jc57uMadMWD2XRSpGzXFZRLWc2s6tCqnY9grFh2nUJynrhVCHhPek2C4F/3yp+ACdVOhmcqPOBAAAAAElFTkSuQmCC"/></th>
                        <th>Total ($)<img style={{width:'15px', height:'15px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR9JREFUSEvt1T0uBVEYxvHfFR8RvZoF0LMCFWEBOjRUKFW3pKNBYwPER2MJopLYgUhsgIKGOcmZZCJ3Zs4k9xQSU01m3jz/97wfz+nJ/PQy6+sK6MeEDlIT6wI4xF4UPsJ+CiQVEAR38RlFJ5AESQEcYxtfWImAG4zjBDtNJ2kChH+n2KiI30exJZSQc2zWQeoA4fsF1geIl1oBcodRBMgWvn+D6gAzeMYk1nBbk+EyroqGf2AOL6mAELeA6ViKpjKHBF7xOCgopckp01gb8w9oLV9TiRZjk69bVFaLEX3DQ5cmz+IJUy1jGjb7svCo92Jc57uMadMWD2XRSpGzXFZRLWc2s6tCqnY9grFh2nUJynrhVCHhPek2C4F/3yp+ACdVOhmcqPOBAAAAAElFTkSuQmCC"/></th>
                        <th>Date <img style={{width:'15px', height:'15px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR9JREFUSEvt1T0uBVEYxvHfFR8RvZoF0LMCFWEBOjRUKFW3pKNBYwPER2MJopLYgUhsgIKGOcmZZCJ3Zs4k9xQSU01m3jz/97wfz+nJ/PQy6+sK6MeEDlIT6wI4xF4UPsJ+CiQVEAR38RlFJ5AESQEcYxtfWImAG4zjBDtNJ2kChH+n2KiI30exJZSQc2zWQeoA4fsF1geIl1oBcodRBMgWvn+D6gAzeMYk1nBbk+EyroqGf2AOL6mAELeA6ViKpjKHBF7xOCgopckp01gb8w9oLV9TiRZjk69bVFaLEX3DQ5cmz+IJUy1jGjb7svCo92Jc57uMadMWD2XRSpGzXFZRLWc2s6tCqnY9grFh2nUJynrhVCHhPek2C4F/3yp+ACdVOhmcqPOBAAAAAElFTkSuQmCC"/></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? orders
                        .slice(currentPage * ordersPerPage, currentPage * ordersPerPage + ordersPerPage)
                        .map((ord, i) => (
                            <tr key={i}>
                                <td style={{ color: '#000009' }}>{ord.orderId}</td>
                                <td>{ord.clientName}</td>
                                <td style={{ color: 'green' }}>${ord.clientTotalPaid.toLocaleString('en-US')}</td>
                                <td style={{ color: '#727272' }}>{new Date(ord.created_at).toLocaleDateString()}</td>
                            </tr>
                        )) : <h2>No orders for now</h2>}
                </tbody>
                <div>
                <button onClick={handleClickPrev} disabled={currentPage === 0} style={{background:'transparent', border:'none'}}><i class='bx bx-log-out-circle' style={currentPage === 0? null: {color:'blue'}}></i></button>
                <button onClick={handleClickNext} disabled={currentPage === totalPages - 1} style={{background:'transparent', border:'none'}}><i class='bx bx-log-in-circle' style={currentPage === totalPages - 1? null: {color:'blue'}}></i></button>
            </div>
            </table>
            
            </div>
            <div className='col-5'>
            <h1 style={{fontWeight:600, color:'#000009', fontSize:'22px'}}>Recent Messages</h1>
            {messages.length > 0? messages.slice(currentPagem * ordersPerPagem, currentPagem * ordersPerPagem + ordersPerPagem).map(function(mes, i){
                return(
                    <div key={i} className='message-div'><lord-icon
                    src="https://cdn.lordicon.com/ayhtotha.json"
                    trigger="hover"
                    colors="primary:#000009"
                    style={{width:'35px',height:'35px'}}>
                </lord-icon>
                        <div className='container'>
                        <div className='row' style={{borderLeft:'1px solid #d4d4d4'}}>
                            <div className='col-5'>{mes.userName.charAt(0).toUpperCase() + mes.userName.slice(1).toLowerCase()} Sent:<br></br><span style={{color:'blue', fontSize:'12px'}}>{calculateTimePassed(mes.created_at)}</span></div>
                            <div className='col-7' style={{padding:'0', textAlign:'left'}}>{mes.contactMessage}</div>
                        </div>
                        </div>
                    </div>

                )
            }) : <h2>No messages for now</h2>}
            <button onClick={handleClickPrevm} disabled={currentPagem === 0} style={{background:'transparent', border:'none'}}><i class='bx bx-log-out-circle' style={currentPagem === 0? null: {color:'blue'}}></i></button>
                <button onClick={handleClickNextm} disabled={currentPagem === totalPagesm - 1} style={{background:'transparent', border:'none'}}><i class='bx bx-log-in-circle' style={currentPagem === totalPagesm - 1? null: {color:'blue'}}></i></button>
            
            </div>
        </div>
    </div>
  )
}

{/* <span>{mes.userName.charAt(0).toUpperCase() + mes.userName.slice(1).toLowerCase()} Send you Message "{mes.contactMessage}" <span style={{color:'blue', fontWeight:600}}>{calculateTimePassed(mes.created_at)}</span></span>*/}
