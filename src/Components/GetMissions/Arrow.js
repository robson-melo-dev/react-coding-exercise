import React from 'react'
import './Arrow.css'
import arrow from "../../assets/vector/arrow.svg";

function Arrow(props) {

  if(props.direction === "asc"){
    return(
      <span className={'arrow '+props.visible}>
      <img src={arrow} className="arrow-down" alt=''/>
      </span>
    )
    }else{return(
      <span className={'arrow '+props.visible}>
      <img src={arrow} className='arrow-up' alt=''/> 
      </span>
    )
    
  
}


}

export default Arrow
