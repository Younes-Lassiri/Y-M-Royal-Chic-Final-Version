import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../../helpers/authContext";
import { BrowserRouter, Route, Link, Routes, useParams, useLocation } from "react-router-dom";
import "./Profile.css";
import { Navigate, useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import profileImg from './myImages/profile-svgrepo-com.png'
import Login from "../Login/Login";
import AddProduct from "../addProduct/AddProduct";
import Settings from "../settings/Settings";
import Orders from "../Orders/Orders";
import Messages from "../Messages/Messages";
import Loader from "../Loader/Loader";
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from "../Dashboard/Dashboard";
import Team from "../Team/Team";
import Reviews from "../Reviews/Reviews";
import Products from "../Products/Products";



export default function Profil() {
  const location = useLocation();
  const { email } = location.state || 'jaja';
  const [totalNoti, setTotalNoti] = useState(0)
  const [profileHovered, setProfileHovered] = useState(false)
  const [orders, setOrders] = useState([])

useEffect(() => {
  const userEmail = localStorage.getItem('userEmail');
  console.log(userEmail)
}, [])
  const [dark, setDark] = useState("off")


  function switchDark() {
    if (dark === "off") {
      setDark("on")
      
    }
    else{
      setDark("off")
    }
  }
  
  useEffect(() => {
    fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/orders')
    .then((res) => res.json())
    .then((data) => {
      setOrders(data)
    })
  }, [])

  const [activeLink, setActiveLink] = useState('overview');
  const [selectedContent, setSelectedContent] = useState('overview');

  const handleLinkClick = (content) => {
    setSelectedContent(content);
    setActiveLink(content);
  };

  // Render content based on selectedContent state
  
  const { logged, setLogged, user, setUser } = useContext(authContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/messages')
        .then((res) => res.json())
        .then((data) => {
          setTotalNoti(data.length)
        })
        .catch((error) => {
            console.error('Error fetching orders:', error);
            setLoading(false);
        });
}, []);



  const checkLogin = () => {
    if (!localStorage.getItem("userToken")) {
      setLogged(false);
      console.log("You are not connected");
      navigate("/login");
    }
  };


 

  const userInfo = async () => {
    try {
      const response = await axios.get("https://royalchicapi-cc1c56c683bf.herokuapp.com/api/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });
  
      const userData = response.data.find((userData) => userData.email === localStorage.getItem('userEmail'));
      if (userData) {
        setUser(userData);
        setLogged(true);
        setLoading(false);
      } else {
        // Handle case where user data is not found
        console.error("User data not found.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    const newYMIndex = document.title.indexOf('Y&M');
    const newTitle = `Admin−${document.title.slice(newYMIndex)}`;
    document.title = newTitle;
}, [document.title]);
  
useEffect(() => {
  checkLogin();
  userInfo();
}, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };



const renderContent = () => {
  switch (selectedContent) {
    case 'store':
      return <AddProduct/>;
      case 'settings':
        return <Settings user={user} setSelectedContent={setSelectedContent} setActiveLink={setActiveLink}/>;
      case 'orders':
        return <Orders user={user} setSelectedContent={setSelectedContent}/>;
      case 'messages':
        return <Messages/>;
        case 'overview':
          return <Dashboard/>; 
          case 'team':
            return <Team/>;
            case 'reviews':
              return <Reviews/>;
              case 'products':
              return <Products/>;
    default:
      return null;
  }
};


  

  const renderView = loading ? (
    <div><Loader/></div>
  ) : (


    <div className="admin-profile">
      
      <div className="admin-navbar">

      <div style={{position:'absolute', left:'40px', display:'flex', gap:'10px', alignItems:'center'}}>
      
      <Link to='/' style={{textDecoration:'none'}}><h1 className="admin-logo">Y&M-Royal Chic</h1></Link>
      
      </div>

      

      <div className="admin-noti">

     

<div style={{position:'relative'}}>
<i class='bx bx-cart-alt' style={{fontSize:'28px', paddingRight:'15px', cursor:'pointer'}}></i>
<span style={{position:'absolute', top:'-3px', right:'8px', zIndex:'2', color:'white', fontSize:'13px', fontWeight:600,
       background:'red', borderRadius:'50%',
       width:'17px', height:'17px', display:'flex', justifyContent:'center', alignItems:'center'
       ,cursor:'pointer'}}>{orders.length > 9 ? '9+' : orders.length}</span>
</div>
        <div style={{position:'relative'}}>
        
        <i class='bx bx-bell' style={{fontSize:'25px', cursor:'pointer'}}></i>
      <span style={{position:'absolute', top:'-3px', right:'-5px', zIndex:'2', color:'white', fontSize:'13px', fontWeight:600,
       background:'red', borderRadius:'50%',
       width:'17px', height:'17px', display:'flex', justifyContent:'center', alignItems:'center'
       ,cursor:'pointer'}}>{totalNoti > 9 ? '9+' : totalNoti}</span>
</div>

<div style={{position:'relative'}}>
<img src="https://ih1.redbubble.net/image.4770862630.8484/st,small,507x507-pad,600x600,f8f8f8.jpg" 
style={{borderRadius:'50%', width:'50px', height:'50px', cursor:'pointer'}} className="nani" onMouseEnter={() => setProfileHovered(true)} onMouseOut={() => setProfileHovered(false)}/>
<div style={{width:'10px', height:'10px', backgroundColor:'rgb(2, 209, 2)', borderRadius:'50%', position:'absolute', bottom:'7px', right:'10px'}}></div>
</div>

{
  profileHovered? <div className="admin-toggle">

  <ul>
    <li style={{padding:'0 0 15px 0'}}><i className='bx bxs-user'></i><span>{user.name}</span></li>
    <li><i className='bx bxs-envelope'></i><span>{user.email}</span></li>
  </ul>
  
  </div> : null
}
  
      </div>

      </div>
      <div className="admin-sidebar">
        <ul className="admin-sidebar-ul">
          <li onClick={() => handleLinkClick('overview')} className={activeLink === 'overview' ? 'admin-visited' : ''}><i className='bx bxs-dashboard' style={{fontSize:'1.2rem'}}></i><Link href="" style={{textDecoration:'none'}}>Overview</Link></li>
          <li onClick={() => handleLinkClick('orders')} className={activeLink === 'orders' ? 'admin-visited' : ''}><i className='bx bxs-cart-alt' style={{fontSize:'1.2rem'}}></i><Link href="" style={{textDecoration:'none'}}>Orders</Link></li>
          <li onClick={() => handleLinkClick('messages')} className={activeLink === 'messages' ? 'admin-visited' : ''}><i className='bx bx-message-rounded-dots' style={{fontSize:'1.2rem'}}></i><Link href="" style={{textDecoration:'none'}}>Messages</Link></li>
          <li onClick={() => handleLinkClick('store')} className={activeLink === 'store' ? 'admin-visited' : ''}><i className='bx bxs-store' style={{fontSize:'1.2rem'}}></i><Link href="" style={{textDecoration:'none'}}>My Store</Link></li>

          
          <li onClick={() => handleLinkClick('reviews')} className={activeLink === 'reviews' ? 'admin-visited' : ''}><i class='bx bxs-comment' style={{fontSize:'1.2rem'}}></i><Link href="" style={{textDecoration:'none'}}>Reviews</Link></li>

          <li onClick={() => handleLinkClick('products')} className={activeLink === 'products' ? 'admin-visited' : ''}><i class='bx bxs-bookmarks' style={{fontSize:'1.2rem'}}></i><Link href="" style={{textDecoration:'none'}}>Products</Link></li>
          
          <li onClick={() => handleLinkClick('team')} className={activeLink === 'team' ? 'admin-visited' : ''}><i className='bx bxs-user' style={{fontSize:'1.2rem'}}></i><Link href="" style={{textDecoration:'none'}}>Team</Link></li>
        </ul>

        <ul className="admin-settings">
        <li onClick={() => handleLinkClick('settings')}><i className='bx bx-cog' style={{fontSize:'1.2rem'}}></i><Link href="" style={{listStyleType:'none', textDecoration:'none'}}>Settings</Link></li>

          
<li onClick={() => handleLogout()} style={{color:'red'}}><i className='bx bx-log-out-circle' style={{fontSize:'1.2rem'}}></i><Link href="" style={{color:'red', textDecoration:'none'}}>Log out</Link></li>
        </ul>
      </div>
      
      

      <div className="admin-content col-10">
        <div className="admin-news" style={{height:'95', padding:'10px 12px'}}>
          <h1 style={{fontWeight:600, color:'#000009', fontSize:'25px'}}>{selectedContent.charAt(0).toUpperCase() + selectedContent.slice(1)}</h1>
          
        </div>

      {renderContent()}
    </div>
      
    </div>



  );

  return <>{renderView}</>;
}