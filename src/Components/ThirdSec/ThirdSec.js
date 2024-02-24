import React, { useState } from 'react';
import imgThird from './myImages/play-svgrepo-com (6).png'
import './ThirdSec.css'
import video from './myImages/clideo_editor_ceeab6fe86cc45058c5eca7c0ba3fc83.mp4'

export default function ThirdSec() {
  const [showVideo, setShowVideo] = useState(false)
  
  return (
    <div className='thirdSection'>
<div className="third-sec" onDoubleClick={() => setShowVideo(false)}>
            <div className="all" onClick={() => setShowVideo(true)}>
            <div className="neww"><img src={imgThird}/></div>
            <div className="old"></div>
            </div>
            {showVideo? <video width="910" height="510" controls className='third-video' id='video'>
      <source src={video} type="video/mp4" />
      <source src={video} type='video/ogg'/>
      Your browser does not support the video tag.
    </video> : null}
        </div>
</div>
  )
}
