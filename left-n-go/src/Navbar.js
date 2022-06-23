import * as React from 'react';
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
// import { AppBar, Box, Toolbar, Typography, IconButton, 
//             Switch, FormControlLabel, FormGroup, MenuItem, Menu } from '@mui/material';
import ProfileIcon from './components/ProfileIcon';
// import { useEffect } from 'react';

export default function Navbar(props) {
    const { user } = useAuth();
    const { countCartItems } = props;

    // useEffect();

    return ( 
        <nav className="navbar">
            {/* Left align */}
            <div>
                <Link to="/home">
                
                    <img className="icon" src='https://i.imgur.com/JclD9j8.png' alt='logo'></img> 
                {/* <div> Left-n-Go</div> */}
                </Link>
            </div>
            {/* Can switch Left-n-Go into the Logo. */}

            {/* Right align */}
            <div className="links">
                <Link to="/cart">Cart {' '}
                    {countCartItems ? ( 
                        <button className="badge">{ countCartItems }</button>
                    ): ''}
                    </Link>     

                    {/*  */}
                    { user ? <><Redirect to="/home"/><ProfileIcon /></> : <Link to="/login">Sign In</Link> }
              {/* { user ? <Link to="/login">Sign In</Link> : <Link to="/notfound">TryOut</Link> } */}
              {/* <Link to="/login">Sign In</Link> */}  
            </div>

        </nav>
     );
}



// { user ? <>
//     <IconButton
//         size="large"
//         aria-label="account of current user"
//         aria-controls="menu-appbar"
//         aria-haspopup="true"
//         onClick={handleMenu}
//         color="inherit"
//     >
//         <AccountCircle style={{fill:"white"}}/>
//     </IconButton>
//     <Menu
//         id="menu-appbar"
//         anchorEl={anchorEl}
//         anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//         }}
//         keepMounted
//         transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//         }}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//     >
//         <Link to="/" style={{textDecoration:"none"}}><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
//         <MenuItem onClick={handleClose}>Sign Out</MenuItem>
//     </Menu>

//  </> : <Link to="/login">Sign In</Link>
// }