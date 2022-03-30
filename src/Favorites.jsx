import React from 'react'

export default function Favorites(props) {
  return (
    <div className='favorites'>
      <div className='favoDaily'>
         <p>city : {props.nameCity}</p>
        <p>condition : {props.conDaily}</p>
        <p>Temp : {props.tempDaily}°</p>
      </div>
       <div className='favoFiveDays'>

        <p> 5 Days : {props.fiveDays}</p>
       </div>
        
    </div>
  )
}
