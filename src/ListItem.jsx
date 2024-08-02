import React from 'react'

import LineItem from './LineItem'

const ListItem = ({activities,handleChange,handleDelete}) => {
  return (
    <ul className="listitem">{activities.map((activity)=>(
        <LineItem 
        key={activity.id}
        activity={activity}
        handleChange={handleChange}
        handleDelete={handleDelete}/>

       ) )
        }

      </ul>
  )
}

export default ListItem