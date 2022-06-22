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
            <Link to="/home">
            
            <img className="small" width="50" height="50" src='data:image/png;base64,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' alt='logo'></img> 
            {/* <div> Left-n-Go</div> */}
            </Link>
            {/* Can switch Left-n-Go into the Logo. */}

            {/* Right align */}
            <div className="links">
                <Link to="/cart">Cart {' '}
                {countCartItems ? ( 
                    <button className="badge">{ countCartItems }</button>
                ): ''}
                </Link>
              {/* { user ? <Link to="/login">Sign In</Link> : <Link to="/notfound">TryOut</Link> } */}
              {/* <Link to="/login">Sign In</Link> */}  
            </div>

            <div>
                { user ? <><Redirect to="/home"/><ProfileIcon /></> : <Link to="/login">Sign In</Link> }
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