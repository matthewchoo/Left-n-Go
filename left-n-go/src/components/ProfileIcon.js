import { IconButton, MenuItem, Menu } from '@mui/material';       
import { AccountCircle } from '@mui/icons-material';
import * as React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';


function ProfileIcon() {
    // const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const { signout } = useAuth();
    // const handleChange = (event) => {
    //     setAuth(event.target.checked);
    // };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return ( 
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{fill:"white"}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <Link to="/" style={{textDecoration:"none"}}><MenuItem onClick={handleClose}>Profile</MenuItem></Link> */}
                <Link to="/vendorProfile" style={{textDecoration:"none"}}><MenuItem>Profile</MenuItem></Link>
                <Link to="/logout" style={{textDecoration:"none"}}><MenuItem onClick={signout}>Sign Out</MenuItem></Link>
              </Menu>
              </>
     );
}

export default ProfileIcon