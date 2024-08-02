import React from 'react'
import './index.css'
import ListItem from './ListItem'

const Content = ({activities,handleChange,handleDelete,styledHeader}) => {
  
  return (
    <div >
      {(activities.length)?(
        <ListItem
        activities={activities}
        handleChange={handleChange}
        handleDelete={handleDelete}/>
      ):(
        <p style={styledHeader}>Your list is empty</p>)}
    </div>
  )
}

export default Content 