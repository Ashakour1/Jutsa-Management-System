import React from 'react'
import logo  from '../assets/logo.png'

const Header = () => {
  return (
    <div> <header className='bg-white-500 text-white p-4 shadow-md'>
    <div className='container mx-auto flex flex-wrap items-center justify-between flex-row-reverse'>
      <nav className='flex-grow'>
        <ul className='flex space-x-4'>
          <li><Link style={{ textDecoration:"none"}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
          <li><Link style={{ textDecoration:"none"}} to='/About'>About</Link>{menu==="about"?<hr/>:<></>}</li>
          <li><Link style={{ textDecoration:"none"}} to='/FAQ'>FAQ</Link>{menu==="faq"?<hr/>:<></>}</li>
        </ul>

      </nav>
      <div className='flex-grow text-center'>
        <img src={logo} alt="logo" className='h-10 mx-auto' />
      </div>
      <div className='flex-grow flex justify-end'>
        <button className='bg-green text-black px-4 py-2 rounded-md shadow hover:bg-white '>Register Now</button>
      </div>
    </div>

  </header></div>
  
  )
}

export default Header