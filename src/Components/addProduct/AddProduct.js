import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './addProduct.css'

export default function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [promoPercentage, setPromoPercentage] = useState(0)
  const [oldPrice, setOldPrice] = useState(0)
  const [promo, setPromo] = useState(null)
  const [neww, setNeww] = useState(null);
  const [soldee, setSoldee] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();


    const newProduct = {
      name: productName,
      thumbnail: productImage,
      price: productPrice,
      isNew: neww === "true"? true: false,
      sold: soldee === "true"? true: false,
      promo: promo === "true"? true: false,
      oldPrice: promo === "true"? Math.floor(parseInt(productPrice) / (1 - promoPercentage / 100)) : 0,
      promoValue: promo === "true"? promoPercentage : 0,
      wish: false,
      quantite: 0
    };

    try {
      const response = await fetch('https://royalchicapi-cc1c56c683bf.herokuapp.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        console.log('Product added successfully');
        toast.success(`${productName} added succesfully`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className='addProduct-section'>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="addPro-form">

      <div className='row'>
        
        <div className='col-md-6 col-12'>
            <label htmlFor="" className='label' style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>Product Name *</label><br />
            <input
              type='text'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px', fontFamily:'"Source Serif Pro",serif'}}
              className="admin-addsmnp"
            />

        </div>

        <div className='col-md-6 col-12'>
        <label htmlFor="" className='label' style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>Product Price *</label><br />
            <input
              type='text'
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px', fontFamily:'"Source Serif Pro",serif'}}
            />
        </div>

      </div>



      <div className='row'>

        <div className='col-12'>
        <label className='label' style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}><a href="https://i-converter.com/files/jpg-to-url" target="_blank" style={{textDecoration: 'none', color: '#727272'}}>
        Product Image *<i class='bx bx-right-top-arrow-circle'></i>
    </a></label><br />
        <input
          type='text'
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          required
          style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px', fontFamily:'"Source Serif Pro",serif'}}
        />
        </div>
        
      </div>

      <div className='row'>
          <div className='col-6'>
            <label htmlFor="productNew" style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>New?</label><br />
            <div className='all-new' style={{display:'flex', gap:'20px', alignItems:'center'}}>
              <div className='newTrue' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="new" type="radio" value={true} onChange={(e) => setNeww(e.target.value)}/>
                  <span style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>Yes</span>
                </label>
              </div>
              <div className='newFalse' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="new" type="radio" value={false} onChange={(e) => setNeww(e.target.value)}/>
                  <span style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>No</span>
                </label>
              </div>
            </div>
          </div>



          <div className='col-6'>
            <label htmlFor="productSolde" style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>Solde out?</label><br />
            <div className='all-solde' style={{display:'flex', gap:'20px', alignItems:'center'}}>
              <div className='soldeTrue' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="sold" type="radio" value={true} onChange={(e) => setSoldee(e.target.value)}/>
                  <span style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>Yes</span>
                </label>
              </div>
              <div className='soldeFalse' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="sold" type="radio" value={false} onChange={(e) => setSoldee(e.target.value)}/>
                  <span style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>No</span>
                </label>
              </div>
            </div>
          </div>
          </div>


          <div className='row'>
          <div className='col-6'>
            <label htmlFor="productPromo" style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>Promo?</label><br />
            <div className='all-promo' style={{display:'flex', gap:'20px', alignItems:'center'}}>
              <div className='promoTrue' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="radio" type="radio" value={true} onChange={(e) => setPromo(e.target.value)}/>
                  <span style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>Yes</span>
                </label>
              </div>
              <div className='promoFalse' style={{display:'flex', gap:'10px', alignItems:'center'}}>
                <label className="radio">
                  <input name="radio" type="radio" value={false} onChange={(e) => setPromo(e.target.value)}/>
                  <span style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>No</span>
                </label>
              </div>
            </div>
          </div>
          <div className='col-6'>
            {promo === "true" &&
              <div className='row'>
                <div className='col-6'>
                  <label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>Promo percentage% *</label>
                  <input type="number" min={1} max={100} value={promoPercentage} onChange={(e) => setPromoPercentage(parseInt(e.target.value))} style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px', fontFamily:'"Source Serif Pro",serif'}}/>
                </div>
                <div className='col-6'>
                  <label style={{color:'#727272', fontSize:'16px', fontWeight:400, fontFamily:'"Source Serif Pro",serif'}}>Origine Price</label>
                  <input 
    type="number" 
    value={Math.floor(parseInt(productPrice) / (1 - promoPercentage / 100))} 
    readOnly
    
    style={{background:'#e9eae4', color: '#999898', border:'none', padding:'19px 19px', fontFamily:'"Source Serif Pro",serif'}}
  />
                </div>
              </div>
            }
          </div>
        </div>
        <div className='row'>
        <button type="submit" className='btn btn-primary add-pro-admin-btn'>Submit</button>
        </div>

      
        </form>
    </div>
  );
}
