import React from 'react'
import { Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg='dark' className='mb-4'>
      <Navbar.Brand className='text-light text-uppercase font-weight-bold'>
        Pocket Periodic Table
      </Navbar.Brand>
    </Navbar>
  )
}

export default Header
