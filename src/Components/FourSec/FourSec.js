import React from 'react'
import './FourSec.css'
import myImg from './myImages/h1-img-3.jpg'

import myImgg from './myImages/h1-img-4.jpg'

export default function FourSec() {
  return (
    <div className="container-fluid conn">
      <div className="row headingOne">
        <div className="col-12">
          <div className="all">
            <h6 className='con-title' id='tit'>NEW ITEMS</h6>
            <h1 className="con-description" id='desc'>Brighten up <span style={{ fontStyle: 'italic' }}>your closet</span> with<br />some of out top picks for this season</h1>
          </div>
        </div>
      </div>


      <div className="row roww">
        <div className="col-xl-6 col-md-6 col-sm-6 col-xs-12 fafa1" >

          <img src={myImg} alt="" className='myImg'/>
          
          <h6>Bracelet<span>$74</span></h6>
          
          <hr />


          <h6>Boots<span>$214</span></h6>
          
          <hr />

          <h6>Sunglasses<span>$94</span></h6>
          
    </div>
    <div className="col-xl-6 col-md-6 col-sm-6 col-xs-12 fafa2" >
      <img src={myImgg} alt="" className='myImgg'/>

      <h6>Vintage Set<span>$480 - $860</span></h6>
          
    </div>
      </div>
    </div>
  )
}