import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './settings.css'

export default function Settings(props) {
const [newName, setNewName] = useState('')

const [newEmail, setNewEmail] = useState('')

const [newPassword, setNewPassword] = useState('')


    const [itemDisplay, setItemDisplay] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const displayResponse = await fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/settings', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ display: itemDisplay }),
          });
    
          const userResponse = await fetch(`https://royalchicapi-cc1c56c683bf.herokuapp.com/api/users`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              oldEmail: props.user.email,
              newEmail: newEmail || props.user.email,
              name: newName || props.user.name,
              password: newPassword || props.user.password,
            }),
          });
    
          if (displayResponse.ok || userResponse.ok) {
            toast.success('Settings and user information updated successfully');
          } else {
            toast.error('Failed to update settings or user information');
          }
        } catch (error) {
          console.error('Error updating settings or user information:', error);
          toast.error('Failed to update settings or user information');
        }
      };

function toDashbord(){
  props.setActiveLink('overview')
  props.setSelectedContent('overview')
}

  return (
    <div style={{padding:'0 30px'}}>
        <ToastContainer />
        <div style={{width:'90%', borderRadius:'3px', position:'relative', height:'90vh'}}>
            <p style={{position:'absolute', right:'20px'}} className='setting-p'>Need to update your profile? <Link style={{color:'#000009', fontWeight:800, textDecoration:'underline overline #f5f8f0'}} onClick={() => toDashbord()}> Go to My Profile</Link></p><br/>
            <div className='row'>
                <div className='col-12'><hr style={{color:'#f5f8f0'}}></hr></div>
            </div>


            <div className='form-settings'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-5'>
                            <label className='settingLabel'>Full Name</label>
                        </div>
                        <div className='col-7'>
                            <input style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px'}} type='text' className='settingInput' onChange={(e) => setNewName(e.target.value)}/>
                        </div>
                    </div>


                    <div className='row' style={{padding:'30px 0'}}>
                        <div className='col-5'>
                            <label className='settingLabel'>Email</label>
                        </div>
                        <div className='col-7'>
                            <input style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px'}} type='text' className='settingInput' onChange={(e) => setNewEmail(e.target.value)}/>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-5'>
                            <label className='settingLabel'>Password</label>
                        </div>
                        <div className='col-7'>
                            <input  style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px'}}type='password' className='settingInput' onChange={(e) => setNewPassword(e.target.value)}/>
                        </div>
                    </div>


                    <div className='row' style={{padding:'80px 0'}}>
                        <div className='col-5'>
                            <label className='settingLabel'>Collection Items Number</label>
                        </div>
                        <div className='col-7'>
                            <input style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px'}} type='number' className='settingInput' onChange={(e) => setItemDisplay(e.target.value)}/>
                        </div>
                    </div>


                            <button type="submit" className='btn btn-primary botonaSubmit yayaSave botonaSubmit'>Save Changes</button>
                        

                    


                </form>
            </div>
        </div>
    </div>
  )
}
