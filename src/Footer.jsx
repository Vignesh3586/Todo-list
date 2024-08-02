import React from 'react'

const Footer = ({length}) => {
    var today=new Date();
    var year=today.getFullYear()
  return (
    <div className='footer'>
       <h1>Copyright&copy;{year} </h1>
    </div>
   
  );
}

export default Footer;