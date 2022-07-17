import { Box, Button, Modal } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import UpdateDetails from "../components/UpdateDetails";
import { firestore } from "../config/firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import { useProvideAuth } from "../hooks/useProvideAuth";
//import { useState } from "react";
//import { IconButton, InputLabel, Input, InputAdornment, Button } from '@mui/material';

const Profile = () => {
    const { user, userType } = useAuth();
    const { error, changeEmail, changePassword } = useProvideAuth()
    // const [ errMsg, setErrMsg ] = useState(error)

    const handleEmailChange = (newEmail) => {
        changeEmail(newEmail)

        const docRef = doc(firestore, 'users', user.uid)
                console.log("docRef: ", docRef)

        updateDoc(docRef, {
            email: newEmail
        })
        // .then(() => {
        //     // console.log("Sucessfully update db")
        //     setErrMsg("Successfully changed email")

        //     setTimeout(() => {
        //         setErrMsg('');
        //         }, 4000)
        // })        
        // handleEmailClose()
    }

    const handlePasswordChange = (newPassword) => {
        changePassword(newPassword)

        // setErrMsg("Successfully changed password")
        //     // handleClose()

        //     setTimeout(() => {
        //         setErrMsg('');
        //     }, 4000)

        // const docRef = doc(firestore, 'users', user.uid)
        //         console.log("docRef: ", docRef)

        // updateDoc(docRef, {
        //     email: newPassword
        // }).then(() => {
        //     console.log("Sucessfully update db")
        //     setErrMsg("Success")
        // })
        // handleClose()        
    }

    const [emailOpen, setEmailOpen] = useState(false);
    const [open, setOpen] = useState(false);

    //Open Email Modal
    const handleEmailOpen = () => {
        setEmailOpen(true);
    }

    //Close Email Modal
    const handleEmailClose = () => {
        setEmailOpen(false);
    }

    //Open PW Modal
    const handleOpen = () => {
        setOpen(true);
    }

    //Close PW Modal
    const handleClose = () => {
        setOpen(false);
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 420,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

    return ( 
        <div className="home">
            <h2>Profile Page</h2>

            {/* { user.photoURL && 
                <div className="image-container">
                    <img src={ user.photoURL } alt="" />
                    <h1>Profile pic Placeholder: </h1>
                </div> 
            } */}

            {/* { errMsg && <h3 style={{color: "red"}}>{ errMsg }</h3>} */}

            {/* { error && <h3 style={{color: "red"}}>{ error }</h3>} */}

            <div className="user-email-profile">
                <h1>Email: { user.email }</h1>
                <Button 
                    size="large" 
                    variant="outlined"
                    style={{marginBottom: '20px', marginTop:'20px'}}
                    sx={{
                        width:'25ch',
                    }}
                    onClick={handleEmailOpen}
                    >Change Email</Button>
                <Modal
                    open={emailOpen}
                    onClose={handleEmailClose}
                    >
                    <Box sx={{ ...style, width: 420 }}>
                        <UpdateDetails isPassword={false} handleFunction={handleEmailChange} />     
                    </Box>
                </Modal>
            </div>
            <div className="image-container">
                {/* <h1>Password:  </h1> */}
                
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
                    onClick={handleOpen}
                    >Change Password</Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                    >
                    <Box sx={{ ...style, width: 420 }}>
                        <UpdateDetails isPassword={true} handleFunction={handlePasswordChange} />
                    </Box>
                </Modal>
            </div>
            {/* <div className="add-products">
                <Button size="large" 
                variant="outlined" 
                style={{marginBottom: '20px'}}
                sx={{
                    width:'25ch',
                }}><Link to='/addProduct'>Add Products</Link></Button>
            </div> */}
            {/* <p>To be Continued.</p> */}
            <p><Link to='/'>Back to the homepage...</Link></p>

        </div>
     );
}
 
export default Profile