import React from 'react'
import './Notification.css'
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from 'react-router-dom';
export default function Notification() {
    const navigate = useNavigate()


    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [contactMessage	, setContactMessage	] = useState('')

    const [submitting, setSubmitting] = useState(false);
    const [userNameError, setUserNameError] = useState('');
    const [userEmailError, setUserEmailError] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!validateInputs()) {
          return;
      }

      setSubmitting(true);

      const body = {
          userName,
          userEmail,
          contactMessage,
      };

      try {
          const response = await fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/messages', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
          });

          if (!response.ok) {
              throw new Error('Error sending message.');
          }

          const data = await response.json();
          console.log('message send successfully:', data);

          // Show success message using toast notification
          toast.success("Thank you! Your message has been successfully sent. We'll get back to you as soon as possible.", {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
              onClose: () => {
                  navigate('/');
              },
          });

          setUserName('');
          setUserEmail('');
          setContactMessage('');
      } catch (error) {
          console.error('Error sending message:', error);
          toast.error('Error sending message. Please try again later.');
      } finally {
          setSubmitting(false);
      }
  };

  const validateInputs = () => {
      let isValid = true;

      // Validate userName
      if (!/^[A-Za-z]+$/.test(userName)) {
          setUserNameError('Name must contain only letters');
          isValid = false;
      } else {
          setUserNameError('');
      }

      // Validate userEmail
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
          setUserEmailError('Invalid email format');
          isValid = false;
      } else {
          setUserEmailError('');
      }

      return isValid;
  };
  return (
    <section className="contact_us">
        <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="contact_inner">
              <div className="row">
                <div className="col-md-10">
                  <div className="contact_form_inner">
                    <div className="contact_field">
                      <h3>Contact Us</h3>
                      <form onSubmit={handleSubmit}>
                      <p>Feel Free to contact us any time. We will get back to you as soon as we can!.</p>
                      <input type="text" className="form-control form-group" placeholder="Name" onChange={(e) => setUserName(e.target.value)} value={userName}/>
                      {userNameError && <span className="message-error">{userNameError}</span>}
                      <input type="text" className="form-control form-group" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)} value={userEmail}/>
                      {userEmailError && <span className="message-error">{userEmailError}</span>}
                      <textarea className="form-control form-group" placeholder="Message" onChange={(e) => setContactMessage(e.target.value)} value={contactMessage}></textarea>
                      <button className="contact_form_submit" type='submit' disabled={submitting}>Send</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="right_conatct_social_icon d-flex align-items-end">
                    <div className="socil_item_inner d-flex">
                      <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                      <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                      <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact_info_sec">
                <h4>Contact Info</h4>
                <div className="d-flex info_single align-items-center">
                  <i className="fas fa-headset"></i>
                  <span>+212 603927836</span>
                </div>
                <div className="d-flex info_single align-items-center">
                  <i className="fas fa-envelope-open-text"></i>
                  <span>y&m-royal-chic@contact.com</span>
                </div>
                <div className="d-flex info_single align-items-center">
                  <i className="fas fa-map-marked-alt"></i>
                  <span>1000+ Clothes partners and 65+ Service city across Morocco, USA, Canada & UAE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
