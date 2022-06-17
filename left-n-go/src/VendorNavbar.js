import * as React from 'react';
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
// import { AppBar, Box, Toolbar, Typography, IconButton, 
//             Switch, FormControlLabel, FormGroup, MenuItem, Menu } from '@mui/material';
import ProfileIcon from './components/ProfileIcon';

const VendorNavbar = () => {
    const { user } = useAuth();

    return ( 
        <nav className="navbar">
            {/* Left align */}
            <Link to="/home"><h1>Left-n-Go</h1></Link> 
            {/* Can switch Left-n-Go into the Logo. */}

            {/* Right align */}
            <div className="links">
                <Link to="/cart">Cart</Link>
                { user ? <><Redirect to="/home"/><ProfileIcon /></> : <Link to="/login">Sign In</Link> }
              {/* { user ? <Link to="/login">Sign In</Link> : <Link to="/notfound">TryOut</Link> } */}
              {/* <Link to="/login">Sign In</Link> */}  
              <a href="/ProfileVendor">Profile</a>
            </div>
        </nav>
     );
}
 
export default VendorNavbar;
