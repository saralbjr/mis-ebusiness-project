import React from 'react'
import loading from '../components/Images/raksi1.png'
import './Loading.css'

const Loading = () => {
  return (
    <div className='loading-container'>
        <img src={loading} alt='Loading...' className='loading-image'/>
    </div>
  )
}

export default Loading
