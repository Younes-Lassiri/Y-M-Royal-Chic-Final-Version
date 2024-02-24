import React from 'react'
import blogPost1 from './myImages/blog-post-1.jpg'
import blogPost2 from './myImages/blog-post-2.jpg'
import blogPost3 from './myImages/blog-post-3.jpg'
import blogPost4 from './myImages/blog-post-4.jpg'
import blogPost5 from './myImages/blog-post-5.jpg'
import blogPost6 from './myImages/blog-post-6.jpg'

import './Blogs.css'
import { Link } from 'react-router-dom'
export default function Blogs() {


    const blogImages = [{src:blogPost1, title:"Keeping up with trends"},
    {src:blogPost2, title:"The most unusal show"},
    {src:blogPost3, title:"Fashion news we need"},
    {src:blogPost4, title:"Just style and confidence"},
    {src:blogPost5, title:"Follow our fresh design"},
    {src:blogPost6, title:"About my fashion line"}]

     
     

  return (
    <div style={{background:'#f8f5f0', paddingBottom:'150px'}}>
    <div className='blogs-section container' style={{width:'100%'}}>
    <div className="row headingOne">
        <div className="col-12">
          <div className="all">
            <h6 className='con-title'>NEW ITEMS</h6>
            <h1 className="con-description">Freshest solutions <span style={{ fontStyle: 'italic' }}>for modern</span> peeps<br />available only at Y&M Royal Chic</h1>
          </div>
        </div>  
      </div>
    <div className='row'>
      {blogImages.map(function(img, i){
        return(
            <div className='col-4 blogImgParent'>
                <img src={img.src} key={i} style={{width:'100%', borderRadius:'2px'}} className='blogImg'/>
                <span style={{color:'#928c81', fontFamily:'Montserrat, sans-serif', fontWeight:600, fontSize:'11px'}} className='dateBlog'>19 Mars, 2024</span>
                
                <Link to='/login'><h5 style={{fontSize:'30px'}}>{img.title}</h5></Link>
                <p style={{color:'#727272', fontSize:'16px', fontFamily:'"Source Serif Pro", serif', paddingTop:'7px', letterSpacing:'1px', lineHeight:'25px'}} className='blogP'>Praesent varius augue urna, ut scelerisque augue lobortis eget. Fusce eros diam, finibus</p>
                
                
                </div>
                
            
        )
      })}
      </div>
    </div>
    </div>
  )
}
