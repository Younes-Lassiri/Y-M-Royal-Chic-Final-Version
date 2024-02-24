import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import myI from './myImages/blog-post-5.jpg';
import view from './myImages/view-eye-svgrepo-com (1).png';
import hideView from './myImages/view-hide-svgrepo-com (1).png';
import './admin.css';

export default function SignUp() {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [confirmPassError, setConfirmPassError] = useState('');

    function showPass() {
        setClicked(!clicked);
    }

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const confirmPassRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fullNameRegex = /^[a-zA-Z\s]*$/; // Only letters and spaces
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format regex

        let isValid = true;

        // Check if full name is valid
        if (!fullNameRegex.test(nameRef.current.value)) {
            setNameError('Full Name is Incorrect');
            nameRef.current.classList.remove('success');
            nameRef.current.classList.add('failed');
            isValid = false;
        } else {
            setNameError('');
            nameRef.current.classList.remove('failed');
            nameRef.current.classList.add('success');
        }

        // Check if email is valid
        if (!emailRegex.test(emailRef.current.value)) {
            setEmailError('Email is Incorrect');
            emailRef.current.classList.remove('success');
            emailRef.current.classList.add('failed');
            isValid = false;
        } else {
            setEmailError('');
            emailRef.current.classList.remove('failed');
            emailRef.current.classList.add('success');
        }

        // Check if password meets requirements
        if (!passwordRegex.test(passRef.current.value)) {
            setPassError('Password is Incorrect');
            passRef.current.classList.remove('success');
            passRef.current.classList.add('failed');
            isValid = false;
        } else {
            setPassError('');
            passRef.current.classList.remove('failed');
            passRef.current.classList.add('success');
        }

        // Check if password and confirm password match
        if (passRef.current.value !== confirmPassRef.current.value) {
            setConfirmPassError('Passwords do not match');
            confirmPassRef.current.classList.remove('success');
            confirmPassRef.current.classList.add('failed');
            isValid = false;
        } else {
            setConfirmPassError('');
            confirmPassRef.current.classList.remove('failed');
            confirmPassRef.current.classList.add('success');
        }

        if (!isValid) {
            return;
        }

        const newUser = {
            id: Math.floor(Math.random() * 100000), // Generate a random user ID
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value
        };
        
        try {
            const response = await fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
        
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
        
            // Clear the form fields after successful submission
            nameRef.current.value = '';
            emailRef.current.value = '';
            passRef.current.value = '';
            confirmPassRef.current.value = '';
        
            // Navigate to '/login' after successful submission
            navigate('/login');
        } catch (error) {
            console.error('Error adding user:', error.message);
            // Handle error, show error message, etc.
        }
    };

    return (
        <div className='parent'>
            <div className='row'>
                <div className='col-6'>
                    <img src={myI} style={{width:'100%', height:'100vh'}}/>
                </div>

                <div className='col-6' style={{position:'relative'}}>
                    <div style={{position:'absolute', top:'7%',left:'41%', transform:'translate(-50%, -50%)', fontSize:'25px'}}><h1 className='logoo'>Y&M Royal Chic</h1></div>
                    <form onSubmit={handleSubmit} style={{position:'relative', top:'50%',left:'50%', transform:'translate(-50%, -50%)', width:'60%'}} >
                        <label htmlFor="">Full Name*</label><br/>
                        <input className='nameInput' type='text' ref={nameRef} placeholder='Full Name' required/><br/>
                        {nameError && <div className="error-message">{nameError}</div>}

                        <label htmlFor="">Work Email*</label><br/>
                        <input type='email' ref={emailRef} placeholder='name@email.com' className='emailInput' required/><br />
                        {emailError && <div className="error-message">{emailError}</div>}

                        <label htmlFor="">Password*</label><br/>
                        <input type={clicked ? 'text' : 'password'} ref={passRef} placeholder='8 Characters Minimum' className='passwordInput' required/>
                        <span className='disable' onClick={() => showPass()}><img src={clicked ? view : hideView} style={{width:'20px', height:'20px'}}/></span><br />
                        {passError && <div className="error-message">{passError}</div>}

                        <label htmlFor="">Confirm Password*</label><br/>
                        <input type={clicked ? 'text' : 'password'} ref={confirmPassRef} placeholder='Confirm Password' className='passwordInput' required/>
                        <span className='disable' onClick={() => showPass()}><img src={clicked ? view : hideView} style={{width:'20px', height:'20px'}}/></span><br />
                        {confirmPassError && <div className="error-message">{confirmPassError}</div>}

                        <p style={{color:'#ACB5BD'}} className='check'>Already have an account? <Link to='/login' style={{color:'#6765E8', textDecoration:'none'}}>Sign In</Link></p>
                        <button type="submit" className='btn btn-primary botonaSubmit' style={{margin:'0 0 10px 0'}}>Sign Up</button>
                        <span style={{color:'#f5f8f0', fontSize:'1.3rem'}}>
                            <Link to='/'><i class='bx bx-arrow-back'></i></Link>
                            </span>
                    </form>
                </div>
            </div>
        </div>
    );
}




