import React, { useState } from 'react';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Cart.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_QUANTITE, MINUCE_QUANTITE, REMOVE_CART, REMOVE_TRASH } from '../redux/actions/actions';
import Checkout from '../Checkout/Checkout';
export default function Cart() {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const total = products.reduce(function(accumulator, pro) {
    return accumulator + pro.price * pro.quantite;
  }, 0);
  


  useEffect(() => {
    const newYMIndex = document.title.indexOf('Y&M');
    const newTitle = `Cart−${document.title.slice(newYMIndex)}`;
    document.title = newTitle;
}, [document.title]);
  const trash = useSelector((state) => state.trash)

const [pay, setPay] = useState(false)


  function removeProductCart(id,name){
    dispatch({type:REMOVE_CART,payload:id})
    toast.error(`${name} removed from Cart`, {
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


  function undoProductCart(id,name){
    dispatch({type:REMOVE_TRASH,payload:id})
  }


  return (
    <div className='cart'>
      <Menu />
      <ToastContainer />
      <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)', zIndex:'9000'}}>{pay? <Checkout products={products} total={total} setPay={setPay}/>: null}</div>
      <div className='title'>
        <h1>Cart</h1>
      </div>
      

      {products.length > 0 ? (
        <div className="container" style={{padding: '5% 0' }}>
          {trash.length > 0 && (
  <div style={{ border: '1px solid rgba(46, 46, 45, 0.5)', padding: '10px 40px', marginBottom: '20px' }}>
    {trash.map(function(trashEle, index) {
      return (
        <div key={index} style={{padding: '10px', marginBottom: '20px',fontFamily:'Source Serif Pro,serif',fontSize:'16px',color:'#727272',fontWeight:400,lineHeight:'1.63em' }}>“{trashEle.name}” removed.
        <a style={{cursor:'pointer',float:'right'}} onClick={() => undoProductCart(trashEle.id, trashEle.name)}>Undo?</a>
        <br></br>
        
        </div>
      );
    })}
  </div>
  
)}
          <div className="row">
            
      
            <div className="col-md-8">
              {products.map(function (product, index) {
                return (
                  <div key={index} style={{borderBottom:'1px solid rgba(46, 46, 45, 0.5)'}} className='all-product'>
                    <div style={{ padding: '20px' }} className='all-product'>
                      <div className='product-cart'>
                        <button className='remove-cart-product' onClick={() => removeProductCart(product.id, product.name)}></button>
                        <img src={product.thumbnail} className='cart-img' />
                        <h1 className='cart-title'>{product.name}</h1>
                      </div>

                      <span className='cart-price'>${product.price}</span>
                      <div className='cart-operation'>
                        <span className='cart-name'>Quantite</span>
                        <div className='edit' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '25px' }}>
                          <button className='minuce-quantite' onClick={() => {dispatch({ type: MINUCE_QUANTITE, payload: product.id });}} style={{color:'#727272',backgroundColor:'transparent',fontWeight:'bold',border:'none',fontSize:'25px',color:'#727272'}}>‹</button>
                          <span className='quantite-num' style={{fontSize:'20px',padding:'0px 10px',color:'#727272'}}>{product.quantite}</span>
                          <button className='add-quantite' onClick={() => {dispatch({ type: ADD_QUANTITE, payload: product.id });}} style={{color:'#727272',backgroundColor:'transparent',fontWeight:'bold',border:'none',fontSize:'25px',color:'#727272'}}>›</button>
                        </div>
                      </div>
                      <span className='price-quantite'>
                        <li className='price-quantite' style={{color:'#727272', listStyleType:'none'}}>${product.price * product.quantite}</li>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="col-md-4" style={{marginTop:'35px'}}>
              <div style={{ backgroundColor: '#e9eae4', padding: '20px' }}>
                <h1 className='cart-heading'>Cart totals</h1>
                <div className='a' style={{ display: 'flex', gap: '50px', borderBottom: '1px solid rgba(46, 46, 45, 0.5)', paddingBottom: '15px' }}>
                  <span>SUBTOTAL</span>
                  <span>$1.205</span>
                </div>
                <div className='b' style={{ display: 'flex', gap: '50px', borderBottom: '1px solid rgba(46, 46, 45, 0.5)', padding: '15px 0' }}>
                  <span>SHIPPING</span>
                  <span>Flat rate: $22</span>
                </div>
                <div className='row' style={{ borderBottom: '1px solid rgba(46, 46, 45, 0.5)', padding: '15px 0' }}>
                  <div className='col-6'></div>
                  <div className='col-6'>
                    <p style={{ marginLeft: '-40px' }}>
                      Shipping options will be<br></br> updated during<br></br> checkout.
                    </p>
                  </div>
                </div>

                <div className='d' style={{ display: 'flex', gap: '75px', borderBottom: '1px solid rgba(46, 46, 45, 0.5)', padding: '15px 0' }}>
                  <span>TOTAL</span>
                  <span>${total.toLocaleString('en-US')}</span>
                </div>
                <div className='e' style={{ padding: '15px 0' }}>
                  <button onClick={() => setPay(true)}>PROCEED TO CHECKOUT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='container' style={{ width: '100%',padding: '5% 0' }}>
          {trash.length > 0 ? (
  <div style={{ border: '1px solid rgba(46, 46, 45, 0.8)', padding: '10px 40px', marginBottom: '20px' }}>
    {trash.map(function (trashEle, index) {
      return (
        <div key={index} style={{ padding: '10px', marginBottom: '20px', fontFamily: 'Source Serif Pro,serif', fontSize: '16px', color: '#727272', fontWeight: 400, lineHeight: '1.63em' }}>
          “{trashEle.name}” removed.<a style={{cursor:'pointer',float:'right'}} onClick={() => {dispatch({type:REMOVE_TRASH,payload:trashEle.id})}}>Undo?</a><br></br>
        </div>
      );
    })}
  </div>
) : null}

          <div style={{ border: '1px solid rgba(46, 46, 45, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px' }}>
            <h1>Your cart is currently empty.</h1>
          </div>
          <Link to='/'>
            <button className='boton'>RETURN TO SHOP</button>
          </Link>
        </div>

      )}



      <div>
        <Footer />
      </div>
    </div>
  );
}