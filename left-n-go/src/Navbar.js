//A Functional component, Navbar, it will be available throughout the whole of the site.
// import { Link } from "react-router-dom";
// import * as React from 'react';
// import { AppBar, Box, Toolbar, Typography, IconButton, 
//             Switch, FormControlLabel, FormGroup, MenuItem, Menu } from '@mui/material';

// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';


// export default function Navbar() {
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       {/* <FormGroup>
//         <FormControlLabel
//           control={
//             <Switch
//               checked={auth}
//               onChange={handleChange}
//               aria-label="login switch"
//             />
//           }
//           label={auth ? 'Logout' : 'Login'}
//         />
//       </FormGroup> */}
//       <AppBar position="static" className="navbar">
//         <Toolbar>
//           {/* <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton> */}
//           {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Photos
//           </Typography> */}
//           <Link to="/home" component="div" sx={{ flexGrow: 1 }} style={{align:"right"}}><h1>Left-n-Go</h1></Link>
//           {auth && (
//             <div>
//               <IconButton
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>My account</MenuItem>
//               </Menu>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

import * as React from 'react';
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
// import { AppBar, Box, Toolbar, Typography, IconButton, 
//             Switch, FormControlLabel, FormGroup, MenuItem, Menu } from '@mui/material';
import ProfileIcon from './components/ProfileIcon';

export default function Navbar(props) {
    const { user } = useAuth();
    const { countCartItems } = props;
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
                { user ? 
                    <Link to="/cart">Cart {' '}
                        {countCartItems ? ( 
                            <button className="badge">{ countCartItems }</button>
                        ): ''}
                        </Link> :
                    
                    <Link to="/register">Register</Link>
                }    

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