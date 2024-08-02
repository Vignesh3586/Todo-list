import React from 'react'
import { FaCirclePlus } from "react-icons/fa6";


const AddItem = ({handleSubmit,addItem,setAddItem}) => {
return (
    <form className='additem'  onSubmit={handleSubmit}>
      <input autoFocus 
        type="text" 
        placeholder='additem' 
        className="addinput"
        required
        value={addItem}
        onChange={(e)=>{
          setAddItem(e.target.value)
        }}
      />
      <button 
        className="addbtn" 
        type="submit">
        <FaCirclePlus />
      </button>
    </form>

  )
}

export default AddItem