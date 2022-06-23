import { Button } from "@mui/material";
import { Link } from "react-router-dom";
//import { useState } from "react";
//import { IconButton, InputLabel, Input, InputAdornment, Button } from '@mui/material';


const VendorProfile = () => {
    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <div className="image-container">
                <h1>Profile pic Placeholder</h1>
            </div> 
            <div className="image-container">
                <h1>Username: {/* Get Username and display*/}</h1>
            </div>
            <div className="image-container">
                <h1>Password: {/* Display Password*/}</h1>
            </div>
            <div className="image-container">
                <h1>Account Type: {/* Account Type*/}</h1>
            </div>
            <div className="add-products">
                <Button size="large" variant="outlined"><Link to='/addProduct'>Add Products</Link></Button>
            </div>
            {/* <p>To be Continued.</p> */}
            <p><Link to='/'>Back to the homepage...</Link></p>
        </div>
     );
}
 
export default VendorProfile