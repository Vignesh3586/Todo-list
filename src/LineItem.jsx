import React from 'react'
import {FaTrashAlt}from 'react-icons/fa'
import './index.css'

const LineItem = ({activity,handleChange,handleDelete}) => {
  return (
    <li className='viewitem' >
    <input
    type="checkbox"
    checked={activity.checked}
    onChange={()=>handleChange(activity.id)}/>
    <label style={(activity.checked)?{textDecoration:"line-through"}:null}
     onDoubleClick={()=>handleChange(activity.id)}>{activity.description}</label>
    <FaTrashAlt role="button" tabIndex="0" className="delbtn" onClick={()=>handleDelete(activity.id)}/>

  </li>

  )
}

export default LineItem