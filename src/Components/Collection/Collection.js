import React, { useState } from 'react';
import './Collection.css'
import { Link, useParams } from 'react-router-dom';
import FourSec from '../FourSec/FourSec';
import { useSelector, useDispatch } from 'react-redux';
import bag from './myImages/shopping-bag-svgrepo-com.png';
import bagHovered from './myImages/shopping-bag-svgrepo-com (1).png';
import { ADD_QUANTITE, ADD_SINGLE_QUANTITE, ADD_TO_CART, ADD_WISH_PRODUCT, HIDE_VIEW, MINUCE_QUANTITE, MINUCE_SINGLE_QUANTITE, REMOVE_WISH_PRODUCT, VIEW_PRODUCT } from '../redux/actions/actions';
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import viewImg from './myImages/view-svgrepo-com.png'
import hoverImg from './myImages/view-svgrepo-com (1).png'
export default function Collection() {
  const {id} = useParams()
  const data = useSelector((state) => state);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  
  const viewedProduct = useSelector((state) => state.viewedProduct)

  const [heartClickedIndices, setHeartClickedIndices] = useState([]);
  const [clicked, setClicked] = useState(false);

  function addToWish(productId, index) {
    setClicked(!heartClickedIndices.includes(index));
    if (!heartClickedIndices.includes(index)) {
      dispatch({ type: ADD_WISH_PRODUCT, payload: productId });
      setHeartClickedIndices((prevIndices) => [...prevIndices, index]);
      toast.success(`${viewedProduct[0].name} added to Wishlist`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      removeWish(productId);
      setHeartClickedIndices((prevIndices) => prevIndices.filter((i) => i !== index));
      toast.error(`${viewedProduct[0].name} removed from Wishlist`, {
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
  }



  const [display, setDisplay] = useState([])


  useEffect(() => {
    fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/settings') // Assuming your backend server is running on port 4000 and has the endpoint /api/settings
      .then((res) => res.json())
      .then(((data) => {
        setDisplay(data.display)
        console.log(data.display);
      }))


      data.products.reverse();
  }, [])


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

  function removeWish(productId) {
    if (clicked) {
      dispatch({ type: REMOVE_WISH_PRODUCT, payload: productId });
    }
  }

 
  

  return (
    <div style={{width:'100%', background:'#f8f5f0'}}>
    <div className="container connn">
      <div className="row headingOne">
        <div className="col-12">
          <div className="all">
            <h6 className='con-title'>NEW ITEMS</h6>
            <h1 className="con-description">Some of the <span style={{ fontStyle: 'italic' }}>jewels</span> from our<br />new summer casual wear collection</h1>
          </div>
        </div>  
      </div>
      <div className="row">
        {data.products.slice(0, display).map((product, index) => (
          
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 carde" key={index} title={product.name}>
            
            <img src={product.thumbnail} alt="" />
            <Link to={`/product/${product.name}`}><div className="price">${product.price}</div></Link>
            
            


            <Link to='/cart'><div className='divHeart' onMouseEnter={() => setClicked(true)} onMouseLeave={() => setClicked(false)}>
      <img src={clicked ? bagHovered : bag} alt="Image"/>
    </div></Link>


            <div className='divView' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={isHovered ? hoverImg : viewImg} alt="Image" onClick={() => {dispatch({type:VIEW_PRODUCT,payload:{id:product.id,name:product.name,thumbnail:product.thumbnail,price:product.price,promo: product.promo,isNew: product.isNew,sold: product.sold,wish: product.wish,quantite: product.quantite}})}}/>
    </div>



            <div className="name"><Link to={`/product/${product.name}`}>{product.name}</Link></div>
            {product.isNew ? <div className='new'>NEW</div> : null}
            {product.promo ? (
  <>
    <div className='promo'>-{product.promoValue}%</div>
    <div className='oldPrice'>${product.oldPrice}</div>
  </>
) : null}
            {product.sold ? <div className='sold'>SOLD OUT</div> : null}

            <Link to={`/product/${product.name}`}><div className='add'></div></Link>
          </div>
          
        ))}
      </div>
      {viewedProduct.length > 0 ? (
  <div className='viewProduct'>
    <div className='container h-100'>
    <div className="row h-100">
        <div className="col-md-5 h-100 col-12 view-leftSide" style={{padding:0,overflow:'hidden'}}>
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

      <FourSec />
    </div>
    </div>
  );
}