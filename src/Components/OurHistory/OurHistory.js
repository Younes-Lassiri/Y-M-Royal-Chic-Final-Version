import React, { useEffect } from 'react'
import './OurHistory..css'
import Menu from '../Menu/Menu'

import first from './myImages/three.jpg'
import two from './myImages/two.jpg'
import sign from './myImages/signature11.png'
import three from './myImages/one.jpg'
import Footer from '../Footer/Footer'

export default function OurHistory() {


    useEffect(() => {
        const newYMIndex = document.title.indexOf('Y&M');
        const newTitle = `Our history−${document.title.slice(newYMIndex)}`;
        document.title = newTitle;
    }, [document.title]);


  return (
    <div className='ourHistory'>
        <Menu/>
        <div className='title'>
        <h1>Our History</h1>
      </div>


      <div className="container first-sec" style={{padding:'150px 0'}}>
      <div className="row">
      <div className="col-xl-6 col-md-6 col-sm-6 col-xs-12 one">
            <h1 style={{ color: '#2e2e2d', fontWeight: 500, fontFamily: 'EB Garamond, serif',fontSize:'2.7rem' }}>Lady <span style={{ fontStyle: 'italic' }}>with a fur </span>hat</h1> {/* Fix font family syntax */}
          
              <p>
                <span>Y&M Royal Chic</span> will Elevate your style with a curated collection of timeless elegance
                and contemporary fashion. Discover chic dresses and versatile pieces that empower your individuality. Step into Y&M Royal Chic –
                where fashion meets grace, and sophistication is effortless.
              </p>
              <img src={sign} alt="" style={{width:'180px', height:'100px'}}/>
    </div>
    <div className="col-xl-6 col-md-6 col-sm-6 col-xs-12 two" >
      <img src={first} alt="" />
    </div>
      </div>
    
    </div>



    <div className='container'>
        <div className='row'>
        <div className='col-xl-6 col-md-6 col-sm-6 col-xs-12 three' style={{padding:'0'}}>
        <img src={two} alt="" />
        </div>
        <div className='col-xl-6 col-md-6 col-sm-6 col-xs-12 four'>
            <h1 style={{ color: '#2e2e2d', fontWeight: 500, fontFamily: 'EB Garamond, serif',fontSize:'2.7rem' }}>Fashion <span style={{ fontStyle: 'italic' }}>history </span> timeline</h1>
          
            <p>
            <span>Y&M Royal Chic</span> will Elevate your style with a curated collection of timeless elegance
            and contemporary fashion. Discover chic dresses and versatile pieces that empower your individuality. Step into Y&M Royal Chic –
            where fashion meets grace, and sophistication is effortless.
          </p>
        </div>
        </div>
      </div>





      <div className="container first-sec" style={{padding:'80px 0'}}>
      <div className="row">
      <div className="col-xl-6 col-md-6 col-sm-6 col-xs-12 one">
            <h1 style={{ color: '#2e2e2d', fontWeight: 500, fontFamily: 'EB Garamond, serif',fontSize:'2.7rem' }}>Suits <span style={{ fontStyle: 'italic' }}>for </span>every woman</h1> {/* Fix font family syntax */}
          
              <p>
                <span>Y&M Royal Chic</span> will Elevate your style with a curated collection of timeless elegance
                and contemporary fashion. Discover chic dresses and versatile pieces that empower your individuality. Step into Y&M Royal Chic –
                where fashion meets grace, and sophistication is effortless.
              </p>
    </div>
    <div className="col-xl-6 col-md-6 col-sm-6 col-xs-12 two" >
      <img src={three} alt="" />
    </div>
      </div>
    
    </div>
    <Footer/>
    </div>
  )
}
