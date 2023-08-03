import React, { useEffect, useRef } from 'react'
import "./MeetGrid.css"

const MeetGridCard = props => {
  const videoRef = useRef();

    props.peer.on("stream", stream => {
      videoRef.current.srcObject = stream;
    })
    
    return (
    <div className='video_card'>
      <video autoPlay ref={videoRef} />
    </div>
  )
}


export default MeetGridCard