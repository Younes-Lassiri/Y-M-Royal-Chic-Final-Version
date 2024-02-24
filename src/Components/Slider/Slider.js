import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './Slider.css';
import { VIEW_PRODUCT } from '../redux/actions/actions';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


import bag from './myImages/shopping-bag-svgrepo-com.png';
import bagHovered from './myImages/shopping-bag-svgrepo-com (1).png';
import viewImg from './myImages/view-svgrepo-com.png';
import hoverImg from './myImages/view-svgrepo-com (1).png';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';

import { HIDE_VIEW } from '../redux/actions/actions';

import { ADD_TO_CART } from '../redux/actions/actions';

import { ADD_SINGLE_QUANTITE } from '../redux/actions/actions';

import { MINUCE_SINGLE_QUANTITE } from '../redux/actions/actions';

import { ADD_WISH_PRODUCT } from '../redux/actions/actions';



import { REMOVE_WISH_PRODUCT } from '../redux/actions/actions';

export default function Sliderr() {

  useEffect(() => {
    const newYMIndex = document.title.indexOf('Y&M');
    const newTitle = `Product Carousel−${document.title.slice(newYMIndex)}`;
    document.title = newTitle;
}, [document.title]);


  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [heartClickedIndices, setHeartClickedIndices] = useState([]);

  const viewedProduct = useSelector((state) => state.viewedProduct)

  function removeWish(productId) {
    if (clicked) {
      dispatch({ type: REMOVE_WISH_PRODUCT, payload: productId });
    }
  }

  function addToWish(productId, index) {
    setClicked(!heartClickedIndices.includes(index));
    if (!heartClickedIndices.includes(index)) {
      dispatch({ type: ADD_WISH_PRODUCT, payload: productId });
      setHeartClickedIndices((prevIndices) => [...prevIndices, index]);
    } else {
      removeWish(productId);
      setHeartClickedIndices((prevIndices) => prevIndices.filter((i) => i !== index));
    }
  }




  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1
    }
  };
  function addToCart(){
    dispatch({type:ADD_TO_CART,payload:viewedProduct[0].id})
    toast.success(`${viewedProduct[0].name} added to Cart`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  
  const data = useSelector((state) => state.products);



  return (
    <div style={{background:'#f8f5f0'}}>
      <Menu/>
      <div className='title'>
        <h1 style={{fontSize:'3.7rem'}}>Product Carousel</h1>
      </div>
    <div className='container' style={{marginTop:'170px',marginBottom:'170px'}}>
      

      
    
    <Carousel arrows={true} swipeable={true}
  draggable={true} infinite={true} autoPlay={true} autoPlaySpeed={2000} customTransition="all 1s" removeArrowOnDeviceType={["tablet", "mobile"]} responsive={responsive}>
      {data.map((product, index) => (
          
          <div className="cardee" key={index} title={product.name}> 
            
            <img src={product.thumbnail} alt="" />
           <Link to={`/product/${product.name.split(' ').join('-')}`}><div className="pricee">${product.price}</div></Link>
            
            


            <Link to='/cart'><div className='divHeartt' onMouseEnter={() => setClicked(true)} onMouseLeave={() => setClicked(false)}>
      <img src={clicked ? bagHovered : bag} alt="Image"/>
    </div></Link>


            <div className='divVieww' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={isHovered ? hoverImg : viewImg} alt="Image" onClick={() => {dispatch({type:VIEW_PRODUCT,payload:{id:product.id,name:product.name,thumbnail:product.thumbnail,price:product.price,promo: product.promo,new: product.new,sold: product.sold,wish: product.wish,quantite: product.quantite}})}}/>
    </div>



            <div className="namee"><Link to={`/product/${product.name}`}>{product.name}</Link></div>
            {product.isNew ? <div className='new'>NEW</div> : null}
            {product.promo ? (
  <>
    <div className='promoo'>-{product.promoValue}%</div>
    <div className='oldPricee'>${product.oldPrice}</div>
  </>
) : null}
            {product.sold ? <div className='sold'>SOLD</div> : null}
            <Link to={`/product/${product.name.split(' ').join('-')}`}><div className='add'></div></Link>
          </div>
          
        ))}
      
</Carousel>
</div>



{viewedProduct.length > 0 ? (
  <div className='viewProduct'>
    <div className='container h-100'>
    <div className="row h-100">
        <div className="col-md-5 h-100 col-12" style={{padding:0,overflow:'hidden'}}>
            <img src={viewedProduct[0].thumbnail} className='h-100 w-100 haha' alt="Viewed Product"/>
        </div>
        <div className="col-md-7 bg-light h-100 col-12 second" style={{padding:'75px 40px',position:'relative'}}>
        <div onClick={() => {dispatch({type:HIDE_VIEW})}}><ToastContainer /></div>
          <div className='hideView'>
            <h3 style={{fontSize:'40px',color:'#2e2e2d',fontWeight:400, fontFamily:'"EB Garamond",serif', lineHeight:'1em'}}>{viewedProduct[0].name}</h3>
            <button style={{position:'absolute',top:'30px',right:'30px'}} onClick={() => {dispatch({type:HIDE_VIEW})}}></button>
            </div>
            <span style={{fontSize:'19px',color:'#727272', fontWeight:300}}>${viewedProduct[0].price}</span><br></br>
            <span style={{color:'#bf402e', fontSize:'21px', fontFamily:'Ionicons', letterSpacing:'.3em'}}>★★★★★</span><br></br>
            <p className='view-para' style={{padding:'15px 0 0  0',fontSize:'17px',color:'#727272'}}>Alie num phaed rum torquatos nec eu, vis detraxit per 
              iculis ex, nihil expete ndis in mei. Mei an per icula 
              eurip idis, hinc ei est. Eos ei nisl graecis, vix aperiri 
              consequat an. Eius lorem ipsum dolor sit.</p><br></br>
              <div className='viewOperation' style={{display:'flex',justifyContent:'start',alignItems:'center',gap:'20px',marginBottom:'30px'}}>
              <span style={{color:'#727272',letterSpacing:'.22em',fontSize:'14px', fontFamily:'Montserrat,sans-serif', fontWeight:500}}>Quantity</span>
                        <div className=''>
                          <button style={{color:'#727272',backgroundColor:'transparent',fontWeight:'bold',border:'none',fontSize:'20px',color:'#727272'}} onClick={() => {dispatch({type:MINUCE_SINGLE_QUANTITE,payload:viewedProduct[0].id})}}>‹</button>
                          <span style={{fontSize:'15px',padding:'0px 7px',color:'#727272'}}>{viewedProduct[0].quantite}</span>
                          <button style={{color:'#727272',backgroundColor:'transparent',fontWeight:'bold',border:'none',fontSize:'20px',color:'#727272'}} onClick={() => {dispatch({type:ADD_SINGLE_QUANTITE,payload:viewedProduct[0].id})}}>›</button>
                        </div>
                        <button className='botona' onClick={() => addToCart()}>Add to cart</button>
              </div>
              <span onClick={() => addToWish(viewedProduct[0].id)}><a className='yaya' style={{textDecoration:'none'}}>ADD TO WISHLIST</a></span>
        </div>
    </div>
</div>

    
  </div>
) : null}
    <Footer/></div>
  );
}
