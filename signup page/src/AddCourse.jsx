import React, { useState } from 'react'
import Appbar from './Appbar'
import { Button, Card, TextField } from '@mui/material';

const AddCourse = () => {
    const [title,setTitle]=useState(" ")
    const [description,setDescription]=useState(" ");
    const handleSubmit=()=>{
        var token=localStorage.getItem("token")
        fetch("http://localhost:3000/admin/addcourse",{
            method:"POST",
            body:JSON.stringify({
                title:title,
                description:description,
                image:"",
                published:true

            }),
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+token

            }
        }).then((res)=>{
            res.json().then((data)=>{
                console.log(data);
            })
        })
    }
    return (
    <>
      <Appbar></Appbar>
      <center>
        
            <Card variant='outlined' style={{
                
                border: "1px solid green",
                width: 400,
                padding:20
            }}>
                <TextField fullWidth id="outlined-basic" label="title Name" variant="outlined" onChange={(e)=>{setTitle(e.target.value)}} />
                <br /> <br /> <br /> 
                <TextField fullWidth id="outlined-basic" label="Description" variant="outlined" onChange={(e)=>{setDescription(e.target.value)}} />
                <br />
                <br />
                <Button onClick={handleSubmit}  style={{float:'left'}} size='small' color='secondary' variant="contained">Add Course</Button>
            </Card>
        </center>
    </>
  )
}

export default AddCourse
