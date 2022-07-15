import { Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../config/firebaseConfig";
import { useAuth } from "../hooks/useAuth";
import { useProvideAuth } from "../hooks/useProvideAuth";
//import { useState } from "react";
//import { IconButton, InputLabel, Input, InputAdornment, Button } from '@mui/material';

const Profile = () => {
    const { user, userType } = useAuth();
    const { error, changeEmail } = useProvideAuth()
    const [ errMsg, setErrMsg ] = useState(error)

    const handleSubmit = (e) => {
        e.preventDefault()

        changeEmail("test@test.com")

        const docRef = doc(firestore, 'users', user.uid)
                console.log("docRef: ", docRef)

        updateDoc(docRef, {
            email: "test@test.com"
        }).then(() => {
            console.log("Sucessfully update db")
        })        
        
        setErrMsg("Success")
    }

    return ( 
        <div className="home">
            <h2>Profile Page</h2>

            {/* { user.photoURL && 
                <div className="image-container">
                    <img src={ user.photoURL } alt="" />
                    <h1>Profile pic Placeholder: </h1>
                </div> 
            } */}

            { errMsg && <h3 style={{color: "red"}}>{ errMsg }</h3>}
             
            <div className="image-container">
                <h1>Email: { user.email }</h1>
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
                    onClick={handleSubmit}
                    >Change Email</Button>
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