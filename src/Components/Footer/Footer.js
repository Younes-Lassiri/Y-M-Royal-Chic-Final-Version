import React from 'react'
import './Footer.css'
import { Link } from 'react-scroll'
import footerImg from './myImages/20240223_214836.png'

export default function Footer() {
  return (
    <div className='container-fluid footer'>
        <div className='row'>
            <div className='col-12 col-md-5 footer-leftSide'><Link to='/'><img src={footerImg} style={{width:'320px', height:'220px'}}/></Link></div>
            
            <div className='col-12 col-md-4'>
                <div className='footer-rightSide-left'>
                <h3 style={{fontFamily:'"EB Garamond",serif'}}>Subscribe to Y&M newsletter<br></br> and share our story.</h3>
                <input type='email' placeholder='Your Email'/>
                </div>



                
            </div>
            <div className='col-3 footer-rightSide-right'>
                <h3 style={{fontFamily:'Open Sans,-apple-system,"Segoe UI",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'}}>ELSEWHERE</h3>

                <ul style={{listStyleType:'none', padding:'0'}}>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/elements/product-carousel'>Shop</a></li>
                    <li><a href='/elements/product-carousel'>Elements</a></li>
                    <li><a href='/cart'>Cart</a></li>
                </ul>

                </div>
                
        </div>
        <div><p style={{position:'absolute', bottom:'0', fontFamily:'Montserrat,sans-serif', letterSpacing:'.42em', textTransform:'uppercase', color:'rgba(248,245,240,.25)', fontSize:'9px'}} className='copyLast'>©Y&M 2024 QODE INTERACTIVE, ALL RIGHTS RESERVED</p></div>
        
        
</div>


  )
}
