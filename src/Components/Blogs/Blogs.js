import React from 'react'


import './Blogs.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Blogs() {

const blogImages = useSelector((state) => state.blogImages)

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
                <img src={img.src} key={i} style={{width:'100%'}} className='blogImg'/>
                <span style={{color:'#928c81', fontFamily:'Montserrat, sans-serif', fontWeight:600, fontSize:'11px'}} className='dateBlog'>19 Mars, 2024</span>
                
                <Link to={`/blog/${img.title.split(' ').join('-')}`}><h5 style={{fontSize:'30px', padding:'15px 0 0 0'}}>{img.title}</h5></Link>
                <p style={{color:'#727272', fontSize:'16px', fontFamily:'"Source Serif Pro", serif', paddingTop:'7px', letterSpacing:'1px', lineHeight:'25px'}} className='blogP'>Praesent varius augue urna, ut scelerisque augue lobortis eget. Fusce eros diam, finibus...</p>
                <Link to={`/blog/${img.title.split(' ').join('-')}`}><h6 className='readMore'>READ MORE</h6></Link>
                
                
                </div>
                
            
        )
      })}
      </div>
    </div>
    </div>
  )
}
