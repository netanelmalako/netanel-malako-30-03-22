import React from 'react'
import './App.css'
export default function Post(props) {
  return (
    <div className='post'>
        <h1>city :{' '}{props.city}</h1>
        <p> {props.day}</p>
        <p>condition :<span style={{fontSize:'20px'}}>{''}{props.condition}</span></p>
        <p>Temp {' '}<span style={{fontSize:'20px'}}>{props.temperature}</span> {props.mark}°</p>

      
        
    </div>
  )
}
