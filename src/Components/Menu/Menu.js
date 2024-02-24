import React from 'react'

import './Menu.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/index.esm'
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Menu(props) {
  const navigate = useNavigate()
  const quantite = useSelector((state) => state.wishProductQuantite)
  const cartQuantite = useSelector((state) => state.cartProductQuantite)

  const [searchValue, setSearchValue] = useState("")


  const [products, setProducts] = useState([])
  


  const [filtredProducts, setFiltredProducts] = useState([])


  const [search, setSearch] = useState(false)

  function isMobileDevice() {
    if(window.innerWidth <= 767){
      return 'true'
    }else{
      return 'false'
    }
  }

  function menu() {
    let hiddenMenu = document.querySelector('.hidden-menu');
    let hiddenSideMenu = document.querySelector('.side-menu');
  
    if (isMobileDevice() === 'false' && getComputedStyle(hiddenMenu).display === 'none') {
      hiddenSideMenu.style.display = 'block';
    } else if (isMobileDevice() === 'true' && getComputedStyle(hiddenMenu).display === 'none') {
      hiddenMenu.style.display = 'block';
    } else if (isMobileDevice() === 'false') {
      hiddenMenu.style.display = 'none';
    } else {
      hiddenMenu.style.display = 'none';
    }
  }


  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue !== "") {
      // Redirect the user to the desired link when the "Enter" key is pressed
      navigate(`/product/${searchValue.charAt(0).toUpperCase() + searchValue.slice(1).toLowerCase()}`)
    }
  };

  
  function hideSideMenu(){
    document.querySelector('.side-menu').style.display = 'none'
  }

  useEffect(() => {
    // Add or remove 'no-scroll' class based on the searching state
    if (search) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [search]);

  useEffect(() => {
    window.addEventListener('scroll', hideSideMenu);
    return () => {
      window.removeEventListener('scroll', hideSideMenu);
    };
  }, []); 

  function hideSideMenu() {
    const sideMenu = document.querySelector('.side-menu');
    if (sideMenu && sideMenu.style.display !== 'none') {
      sideMenu.style.display = 'none';
    }
  }


  useEffect(() => {
    fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/products')
    .then((res) => res.json())
    .then((data) => {
      setProducts(data)
      
    })
  }, [])


  useEffect(() => {
    if (searchValue.trim() === '') {
      setFiltredProducts([]);
    } else {
      setFiltredProducts(products.filter(product => 
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      ));
    }
  }, [searchValue, products]);
  
  


  return (
    <div id={props.profile === true? "menuP": "menu"} className="head-menu">
      {search? (
        <div className="search-popUp-parent">
        <div className='container' style={{padding:'30px 0'}}>
          <div className='row' style={{borderBottom:'1px solid #e0e0e0'}}>
            <div className='col-11'>
            <input type='text' placeholder='Enter your search...' className='search-product-popUp' onChange={(e) => setSearchValue(e.target.value)} onKeyDown={handleKeyDown}/>
            
            </div>
            <div className='col-1'><button className='hide-search-bar' onClick={() => setSearch(false)}>✖</button></div>
          </div>
          <div className='container' style={{padding:'50px 0 0 0'}}>
          <div className='row'>
              {filtredProducts.map(function(product){
                return(
                  <div className='col-3' style={{display:'flex', alignItems:'center', gap:'15px', padding:'20px 0 0 0'}}>
                      <Link to={`/product/${product.name}`}><div style={{backgroundImage:`url(${product.thumbnail})`, width:'80px', height:'80px', backgroundPosition:'center', backgroundSize:'cover'}}></div></Link>
                      <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                      <Link className='searchLink' to={`/product/${product.name}`}><span>{product.name}</span></Link>
                      <div style={{display:'flex', gap:'7px'}}>
                      {product.promo? <span style={{color:'727272', fontSize:'16px', fontFamily:'"EB Garamond",serif', textDecoration:'line-through'}}>${product.oldPrice}</span> : null}
                      <span style={{color:'727272', fontSize:'16px', fontFamily:'"EB Garamond",serif'}}>${product.price}</span>
                      </div>
                      </div>
                  </div>
                  )
              })}
            
          </div>
          </div>
        </div>
        
      </div>
      ): null}
      
<div className={props.profile === true? "admin-section adminHide": "admin-section"}><span>Y&M_royal-chic@contact.com</span>
<ul>
  <li style={{listStyleType:'none'}}><Link to='/y&m-admin' style={{textDecoration:'none'}}>My account</Link></li>
  <li style={{listStyleType:'none'}} onClick={() => setSearch(true)}><Link to='/' style={{textDecoration:'none'}}>Search</Link></li>
  <li style={{listStyleType:'none'}}><Link to='/wishlist' style={{textDecoration:'none'}}>Wishlist</Link></li>
</ul>
</div>
    <nav className={props.profile === true? "navbar navbar-expand-lg yayaP": "navbar navbar-expand-lg yaya"}>
      <div className="container-fluid" style={{overflow: 'hidden'}}>
        <a className="navbar-brand menu-logo" href="/">
        Y&M Royal Chic
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={props.profile === true? "navbar-nav me-auto mb-2 mb-lg-0 menu menuPp": "navbar-nav me-auto mb-2 mb-lg-0 menu"}>
            <li className="nav-item">
                <Link className={props.profile === true? 'span activeeP': 'span activee'} to="/"  style={{textDecoration:'none'}}>
          HOME
        </Link>


            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/our-history">
            Our History
                </Link>
            </li>
            <li  className="nav-item"><Link to={'/elements/product-carousel'} className="nav-link">SHOP</Link></li>
            
            <li className="nav-item">
            <Link className="nav-link" to="/cart">
            Cart({cartQuantite})
                </Link>
            </li>
          </ul>
          
        </div>
        <div className="hamburger-toggle" onClick={menu}>
                <span className="line top" style={{width:'100%', height:'0.5px'}}></span>
                <span className="line middle" style={{width:'100%', height:'0.5px'}}></span>
                <span className="line bottom" style={{width:'100%', height:'0.5px'}}></span>
            </div>
      </div>
    </nav>












    <div className='hidden-menu'>
      <ul className='navbar-nav'>
        <li><Link className="activee" to="/">
                  HOME
                </Link></li>
        <li><a href="#">PAGES</a></li>
        <li><Link to='/shop'>SHOP</Link></li>
        <li><a href="v">ELEMENTS</a></li>
        <li className="nav-item">
            <Link className="nav-link" to="/cart">
            Cart({cartQuantite})
                </Link>
            </li>
        <li className="nav-item">
            <Link className="nav-link" to="/wishList">
                  WishList({quantite})
                </Link>
            </li>
      </ul>
    </div>
    <div className="side-menu">
    <h6 className="navbar-brand side-menu-title" href="#">
        Y&M Royal Chic
        </h6>
        <p>Y&M Royal Chic is a destination for mo
          dern women seeking a blend of timeless 
          elegance and contemporary fashion. Our curated collection celebrates indi
          viduality with chic dresses and versatile pieces, offering a seamless fusion of grace and sophisticat
          ion. Step into Y&M Royal Chic, where style mee
          ts simplicity, and discover a curated selection that empowers your unique expression of fashion.</p>
            <h3>FOLLOW US</h3>
            <button className='side-menu-btn' onClick={hideSideMenu}></button>
<div className="social">
  <span>Ig.</span>
  <span>Fb.</span>
  <span>Tw.</span>
</div>
    </div>
    </div>
  )
}

