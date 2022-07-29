import React from 'react'
import './Arrow.css'
import arrow from "../../assets/vector/arrow.svg";

function Arrow(props) {


  if(props.direction == "asc"){
    return(
      <span className='arrow'>
      <img src={arrow} className="arrow-up"/>
      </span>
    )
    }else{return(
      <span className='arrow'>
      <img src={arrow} className="arrow-down"/> 
      </span>
    )
    
  
}


}

export default Arrow
