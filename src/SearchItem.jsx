import React from 'react'

const SearchItem = ({searchItem,setSearchItem}) => {
  return (
    <form className='searchitem' onSubmit={(e)=>{
      e.preventDefault()
    }}>
        <input className='searchinput'
         placeholder='searchitem' 
         value={searchItem}
         onChange={(e)=>{
          setSearchItem(e.target.value)}}></input>
    </form>
  )
}

export default SearchItem