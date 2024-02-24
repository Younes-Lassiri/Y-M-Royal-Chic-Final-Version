import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import myI from './myImages/blog-post-4.jpg';
import view from './myImages/view-eye-svgrepo-com (1).png';
import hideView from './myImages/view-hide-svgrepo-com (1).png';
import '../Admin/admin.css';
import { authContext } from '../../helpers/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const { user, logged, setLogged } = useContext(authContext);
    const [clicked, setClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (email !== '' && password !== '') {
            try {
                const res = await axios.post('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/login', {
                    email,
                    password,
                });
                
                if (res.status === 200) {
                    localStorage.setItem('userToken', res.data.token);
                    setLogged(true);
                    navigate('/profile', { state: { email: email } });
                    localStorage.setItem('userEmail', email);
                }
                
            } catch (error) {
                console.error('Error logging in:', error.message);
                toast.error('Invalid credentials', { position: 'top-center' });
            }
        } else {
            toast.error('Please fill the form', { position: 'top-center' });
        }
    };
    

    useEffect(() => {
        checkLogin();
      }, []);
    
      const checkLogin = () => {
        if (localStorage.getItem("userToken")) {
          setLogged(true);
          console.log("You are connected");
          navigate("/profile");
        }
      };
    
    
    function showPass() {
        setClicked(!clicked);
    }

    return (
        <div className="parent" style={{ position: 'relative', overflow: 'hidden' }}>
            
            <div className="row">
                

                <div className="col-6" style={{ position: 'relative' }}>
                <ToastContainer />
                    <div style={{ position: 'absolute', top: '20%', left: '41%', transform: 'translate(-50%, -50%)', fontSize: '25px' }}>
                        <h1 className="logoo">Y&M Royal Chic</h1>
                    </div>
                    <form
                        style={{ position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%' }}
                        onSubmit={handleLogin}
                    >
                        <label htmlFor="">Work Email</label>
                        <br />
                        <input
                            type="email"
                            placeholder="name@email.com"
                            className="emailInput"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <br />

                        <label htmlFor="">Password</label>
                        <br />
                        <input
                            type={clicked ? 'text' : 'password'}
                            placeholder="Password"
                            className="passwordInput"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <span className="disable" onClick={() => showPass()}>
                            <img src={clicked ? view : hideView} style={{ width: '20px', height: '20px' }} alt="view/hide password" />
                        </span>
                        <br />

                        <p style={{ color: '#ACB5BD', padding: '20px 0' }} className="check">
                            Not Registered yet? <Link to="/y&m-admin" style={{ color: '#6765E8', textDecoration:'none' }}>
                                Sign Up
                            </Link>
                        </p>
                        <button type="submit" className="btn btn-primary botonaSubmit" style={{margin:'0 0 20px 0'}}>
                            Sign In
                        </button>
                        <span style={{color:'#f5f8f0', fontSize:'1.3rem'}}>
                            <Link to='/'><i class='bx bx-arrow-back'></i></Link>
                            </span>
                        
                    </form>
                    
                </div>
                <div className="col-6">
                    <img src={myI} style={{ width: '100%', height: '100vh' }} alt="background" />
                </div>
            </div>
        </div>
    );
}