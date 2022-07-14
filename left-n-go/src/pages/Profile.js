import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
//import { useState } from "react";
//import { IconButton, InputLabel, Input, InputAdornment, Button } from '@mui/material';

const Profile = () => {
    const { user, userType } = useAuth();

    return ( 
        <div className="home">
            <h2>Profile Page</h2>

            {/* { user.photoURL && 
                <div className="image-container">
                    <img src={ user.photoURL } alt="" />
                    <h1>Profile pic Placeholder: </h1>
                </div> 
            } */}
             
            <div className="image-container">
                <h1>Email: { user.email }</h1>
            </div>
            <div className="image-container">
                <h1>Account Type: { userType === "Cust" ? "Customer" : userType }</h1>
            </div>
            <div className="image-container">
                {/* <h1>Password:  </h1> */}
                <Button 
                    size="large" 
                    variant="outlined"
                    style={{marginBottom: '20px', marginTop:'20px'}}
                    sx={{
                        width:'25ch',
                    }}
                    onClick={() => {}}
                    ><Link to='/changePassword'>Change Password</Link></Button>
            </div>
            <div className="add-products">
                <Button size="large" 
                variant="outlined" 
                style={{marginBottom: '20px'}}
                sx={{
                    width:'25ch',
                }}><Link to='/addProduct'>Add Products</Link></Button>
            </div>
            {/* <p>To be Continued.</p> */}
            <p><Link to='/'>Back to the homepage...</Link></p>
        </div>
     );
}
 
export default Profile