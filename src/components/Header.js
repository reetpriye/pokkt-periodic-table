import React from 'react'
import { Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg='dark' className='mb-4'>
      <Navbar.Brand className='text-light text-uppercase font-weight-bold'>
        <h3 className='text-shadow'>Pocket Periodic Table</h3>
      </Navbar.Brand>
    </Navbar>
  )
}

export default Header
