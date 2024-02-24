import React, { useEffect } from 'react';
import './SingleBolg.css';
import { useParams } from 'react-router-dom';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SingleBolg() {
    


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

          toast.success("Thank you! Your message has been successfully sent. We'll get back to you as soon as possible.", {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
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
      if (!/^[A-Za-z]+$/.test(userName)) {
          setUserNameError('Name must contain only letters');
          isValid = false;
      } else {
          setUserNameError('');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
          setUserEmailError('Invalid email format');
          isValid = false;
      } else {
          setUserEmailError('');
      }

      return isValid;
  };



    const { blogTitle } = useParams();
    const blogPost = useSelector((state) => state.blogImages);

    useEffect(() => {
        console.log(blogTitle.split('-').join(' '));
    }, [blogTitle]);

    const mainPost = blogPost.find((blog) => blog.title === blogTitle.split('-').join(' '));


    useEffect(() => {
        const newYMIndex = document.title.indexOf('Y&M');
        const newTitle = `${blogTitle.split('-').join(' ')} - ${document.title.slice(newYMIndex)}`;
        document.title = newTitle;
    }, [blogTitle]);
    return (
        <div className='SingleBolg'>
            <Menu />
            <div className='title'>
                <h1>Y&M Royal Chic</h1>
            </div>
            <div className='container' style={{paddingTop:'150px'}}>
                <div className='row'>
                    <div className='col-10'>
                    </div>
                        <img src={mainPost.src} style={{width:'75%', height:'80vh'}}/>

                    <div className='col-2'>
                        
                    </div>
                </div>



                <div className='row'>
                    <div className='col-10' style={{paddingTop:'30px'}}>
                    <span style={{color:'#928c81', fontFamily:'Montserrat, sans-serif', fontWeight:600, fontSize:'13px'}} className='dateBlog'>19 Mars, 2024</span><br></br>
                    <h5 style={{fontSize:'30px', padding:'15px 0 0 0'}}>{mainPost.title}</h5><br></br>

                    <p className='singlePosP'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit hendrerit faucibus. Suspendisse hendrerit turpis dui, eget ultricies erat consequat ut. Sed ac velit iaculis, condimentum neque eu, maximus urna. Maecenas vitae nunc sit amet risus aliquet facilisis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In facilisis mi sit amet metus sagittis rhoncus. Nullam vel euismod nulla. Sed at fermentum lacus.
</p><br></br>

<p style={{color:'2e2e2d', paddingLeft:'150px', width:'50%', fontSize:'22px'}}>"Nunc eleifend, dolor ac laoreet consectetur, magna diam scelerisque erat, nec fermentum est velit et arcu. Morbi accumsan metus. Curabitur pellentesque vel lacus ultrices auctor. In facilisis mi sit amet metus sagittis rhoncus. Nullam vel euismod nulla. Sed at fermentum lacus. Quisque vel eros sit amet nulla pellentesque cursus. Morbi blandit luctus lorem est velit et arcu."</p>
<br></br>


<p className='singlePosP'>Praesent consectetur, nisi consequat malesuada efficitur, ex odio ultricies est, a dictum metus dolor ut purus. Proin eleifend maximus arcu vitae pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae. Maecenas vitae nunc sit amet risus aliquet facilisis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In facilisis mi sit amet metus sagittis rhoncus. Nullam vel euismod nulla. Sed at fermentum lacus. Praesent consectetur, nisi consequat malesuada efficitur, ex odio ultricies est, a dictum metus dolor ut purus. Proin eleifend maximus arcu vitae pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae. Morbi vel accumsan metus. Curabitur pellentesque vel lacus ultrices auctor. Quisque vel eros sit amet nulla pellentesque cursus.</p>





<div className='row' style={{width:'94%', paddingTop:'40px'}}>
                    <div className='col-4'>
                    <img src='https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/blog-post-7-gallery-1.jpg' style={{width:'100%',height:'100%'}}/>
                    </div>
                        

                    <div className='col-4'>
                        <img src='https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/blog-post-7-gallery-2.jpg' style={{width:'100%'}}/>
                    </div>

                    <div className='col-4'>
                        <img src='https://lacomete.qodeinteractive.com/wp-content/uploads/2019/04/blog-post-7-gallery-3.jpg' style={{width:'100%'}}/>
                    </div>
                </div>
                <p className='singlePosP' style={{paddingTop:'40px'}}>Integer maximus ante in lectus imperdiet, sed sagittis libero feugiat. Morbi elementum magna sed nisi luctus, quis convallis nunc porta. Morbi in molestie dui. Nullam ligula magna, rutrum eget aliquam sit amet, egestas mollis sapien. Integer quis sapien tempus, tristique augue a, placerat neque. Morbi a nunc sit amet tortor tempus finibus. Aliquam erat volutpat. Duis condimentum congue felis, sed posuere neque. Vestibulum id diam sed lectus tincidunt cursus eget id purus. Pellentesque enim sapien, rutrum nec lectus et, interdum imperdiet nunc. Donec convallis, nisl quis congue efficitur.</p>
              
                    </div>
                        

                    <div className='col-2'>
                    </div>
                </div>

                <div className='row'>
<ToastContainer />
    <div className='col-10'>
    <span style={{color:'#727272', fontSize:'16px', fontFamily:'"Source Serif Pro",serif', fontWeight:400, lineHeight: '1.63em'}}>Send a Message</span><br></br>
<span style={{color:'#727272', fontSize:'16px', fontFamily:'"Source Serif Pro",serif', fontWeight:400, lineHeight: '1.63em'}}>Your email address will not be published. Required fields are marked *</span><br></br>




<form onSubmit={handleSubmit}>
<label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif', lineHeight:'1.63em'}}>Your Message</label><br></br>
<textarea style={{width:'92%',height:'30vh', background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px', outline:'none'}} onChange={(e) => setContactMessage(e.target.value)} value={contactMessage}/><br></br>
<label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif', lineHeight:'1.63em'}}>Name *</label><br></br>
{userNameError && <span className="message-error">{userNameError}</span>}

<input type='text' style={{width:'92%',background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px'}} onChange={(e) => setUserName(e.target.value)} value={userName}/><br></br>
<label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif', lineHeight:'1.63em'}}>Email *</label><br></br>
{userEmailError && <span className="message-error">{userEmailError}</span>}

<input type='email' style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px',width:'92%'}} onChange={(e) => setUserEmail(e.target.value)} value={userEmail}/><br></br>
<button type='submit' style={{padding:'14px 45px', color:'#000009', fontWeight:200, background:'transparent', border:'1px solid #000009',margin:'40px 0'}} className='review-btn'>Submit</button>
</form>
    </div>
</div>
            </div>
            <Footer />
        </div>
    );
}