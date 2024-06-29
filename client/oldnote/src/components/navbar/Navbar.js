import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({logged,setLog}) => {
    
  return (
    <div>
        <div className='navbar-container'>
            <div className="navbar-logo">
                <h2>Old Notes</h2>
            </div>
           <div className="navbar-pages">
              {logged?<div className="navbar-logged">
                  <Link to='/Search'>Search</Link>
                  <Link to='/DrawBoard'>Create</Link>
                  <Link to='/Notes'>Notes</Link>
                  <Link to='/Profile'>Profile</Link>
              </div>:
              <div className="navbar-login">
                  <Link to='/Login'>Login</Link>
              </div>}
            </div>
    </div>
    </div>
  )
}

export default Navbar