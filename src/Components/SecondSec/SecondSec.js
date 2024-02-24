import React from 'react';
import './SecondSec.css'
import { Link } from 'react-scroll';


export default function SecondSec() {
  return (
    <div className="" style={{background:'#f8f5f0', padding:'50px 0'}}>
      <div className='container' style={{padding:'0'}}>
        <div className='row'>
        <div className='col-xl-6 col-md-6 col-sm-6 col-xs-12 three' style={{padding:'0'}}>
        <img src='https://lacomete.qodeinteractive.com/wp-content/uploads/2019/05/shop-img-63-600x795.jpg' alt="" />
        </div>
        <div className='col-xl-6 col-md-6 col-sm-6 col-xs-12 four'>
        <h1 style={{ color: '#928c81', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em'}}>OUR BI-MONTHLY EDITORIAL</h1>
            <h1 style={{ color: '#2e2e2d', fontWeight: 500, fontFamily: 'EB Garamond, serif',fontSize:'2.7rem' }}>Understanding <span style={{ fontStyle: 'italic' }}>style</span> again</h1>
          
            <p>
            <span style={{ fontWeight: 500, color:"#000009" }}>Y&M Royal Chic</span> will Elevate your style with a curated collection of timeless elegance
            and contemporary fashion. Discover chic dresses and versatile pieces that empower your individuality. Step into Y&M Royal Chic –
            where fashion meets grace, and sophistication is effortless.
          </p>
          <a href='/elements/product-carousel'><button className='button'>SHOP NOW</button></a>
        </div>
        </div>
      </div>
    </div>
  );
}


/*


<div className="" style={{background:'#f8f5f0'}}>
      <div className="container second-sec" style={{padding:'80px 0'}}>
  <div className="row">
    <div className="col-xl-6 col-md-6 col-sm-6 col-xs-12 three">
      <img src='https://lacomete.qodeinteractive.com/wp-content/uploads/2019/05/shop-img-63-600x795.jpg' alt="" />
    </div>
    <div className="col-xl-6 col-md-6 col-sm-6 col-xs-12 four">
    <h1 style={{ color: '#928c81', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em'}}>OUR BI-MONTHLY EDITORIAL</h1>
            <h1 style={{ color: '#2e2e2d', fontWeight: 500, fontFamily: 'EB Garamond, serif',fontSize:'2.7rem' }}>Understanding <span style={{ fontStyle: 'italic' }}>style</span> again</h1>
          
            <p>
            <span style={{ fontWeight: 500 }}>Y&M Royal Chic</span> will Elevate your style with a curated collection of timeless elegance
            and contemporary fashion. Discover chic dresses and versatile pieces that empower your individuality. Step into Y&M Royal Chic –
            where fashion meets grace, and sophistication is effortless.
          </p>
          <a href='/elements/product-carousel'><button className='button'>SHOP NOW</button></a>
        
</div>
</div>
</div>
</div>

*/
