import React from 'react'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Appbar = () => {
  return (
    <>
      <div style={{
        display:'flex',
        justifyContent:'space-between'
      }}>
        <Typography variant='h5'>Udemy</Typography>
        <div style={{
            padding:10,
           
        }}>
        <Link to='/'><Button variant='outlined' style={{marginRight:10}}>Home</Button></Link>
        <Link to='/courses'><Button variant='outlined' style={{marginRight:10}}>All Courses</Button></Link>
        <Link to='/login'><Button variant='outlined' style={{marginRight:10}}>Signin</Button></Link>
        <Link to='/signup'><Button variant='outlined'>SignUp</Button></Link>
        </div>
      </div>
    </>
  )
}

export default Appbar
