import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Appbar from './Appbar';
import { useState } from 'react';

function Signin(){
    const [username,setUsername]=useState(" ")
    const [password,setPassword]=useState(" ")
    const handleSignin=()=>{
        fetch("http://localhost:3000/admin/login",{
            method:"POST",
            body:JSON.stringify({
                username,
                password
            }),
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            res.json().then((data)=>{
                localStorage.setItem("token",data.token);
            })
        })
    }
    return(
        <>
        <Appbar></Appbar>
        <center>
            <div style={{
                paddingTop:150,
                marginBottom:20
            }}>
                <b>Welcome to Udemy Please <br /> Signin Below</b>
            </div>
        
            <Card variant='outlined' style={{
                
                border: "1px solid green",
                width: 400,
                padding:20
            }}>
                <TextField fullWidth id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>{setUsername(e.target.value)}} />
                <br /> <br /> <br /> 
                <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>{setPassword(e.target.value)}} />
                <br />
                <br />
                <Button onClick={handleSignin} style={{float:'left'}} size='small' color='secondary' variant="contained">Signin</Button>
            </Card>
        </center>
        </>
    )
}
export default Signin;