import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white p-4 flex justify-between'>
        <Link to="/" className='font-bold'>CodeShelf</Link>
        <div className='space-x-4'>
          <Link to="/notes">Notes</Link>  
        </div>
    </nav>
  )
}

export default Navbar