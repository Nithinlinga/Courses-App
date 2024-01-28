import { Card } from '@mui/material';
import './signup.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Appbar from './Appbar';
import { useState } from 'react';

function Signup(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
   const handleSubmit=()=>{
    fetch('http://localhost:3000/admin/signup',{
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
            console.log(data.token)
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
                <b>Welcome to Udemy Please <br /> Signup Below</b>
            </div>
        
            <Card  variant='outlined' style={{
                
                border: "1px solid green",
                width: 400,
                padding:20
            }}>
                <TextField fullWidth id="outlined-basic" label="Username"  variant="outlined"
                 onChange={(e)=>{
                    setUsername(e.target.value)
                 }} />
                <br /> <br /> <br /> 
                <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" 
                 onChange={(e)=>{
                    setPassword(e.target.value)
                 }}/>
                <br />
                <br />
                <Button onClick={handleSubmit} style={{float:'left'}} size='small' color='success' variant="contained">SignUp</Button>
                {/* <Button onClick={()=>{
                    let username=document.getElementById('username').value;
                    let password=document.getElementById('password').value;
                    fetch('http://localhost:3005/admin/signup',{
                        method:"POST",
                        body:JSON.stringify({
                            username,
                            password
                        }),
                        headers:{
                            "Content-Type":"application/json"
                        }
                    }).then((res)=>{
                        return res.json().then((data)=>{
                            console.log(data)
                        })
                    })
                }} style={{float:'left'}} size='small' color='success' variant="contained">SignUp</Button> */}
                {/* not a optimal way to fetch username and password */}

            </Card>
        </center>
        </>
    )
}
export default Signup;