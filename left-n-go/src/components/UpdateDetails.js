import { Input, InputLabel, Button } from "@mui/material"
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react"
import { firestore } from "../config/firebaseConfig";
// import { Redirect } from "react-router-dom";
import { useAuth, auth } from "../hooks/useAuth"
// import { useProvideAuth } from "../hooks/useProvideAuth";

//To pass in the db function, changeEmail/change pass function
//isPassword (determines the text field type), function() -> change email/pw
//submit will be the function
export default function UpdateDetails({ isPassword, handleFunction }) {
    const { dispatch } = useAuth();
    // const { error } = useProvideAuth();

    const [ data, setData ] = useState('')
    const [ confirmData, setConfirmData ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ warning, setWarning ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (data.trim() !== confirmData.trim()) {
            isPassword ? setWarning("Password do not match") : setWarning('Email do not match')
            setIsLoading(false)
        } else if (isPassword && data.toString().length < 6) {
            setWarning ("Password have to be more than 6 characters")
            setIsLoading(false)
        } else {
            setWarning('')
            
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                password
            )
                
        
            reauthenticateWithCredential(
                auth.currentUser,
                credential
            ).then((response) => {
                //setUser(response.user)
                const docRef = doc(firestore, 'users', response.user.uid)
                // setError("Successfully authenticated")
                // console.log(response.user.uid)
      
                getDoc(docRef).then((snapshot) => {
                    dispatch({ type: 'LOGIN', payload: response.user, userType: snapshot.data().userType })
                })
                // console.log("re-auth success")
                handleFunction(data);
    
                setTimeout(() => {
                    isPassword ? setWarning("Successfully changed Password") : setWarning("Successfully changed Email")
                    setIsLoading(false)
                }, 4000)
                clearData()

            }).catch((err) => {
                if (err.message === "Firebase: Error (auth/wrong-password).") {
                    setTimeout(() => {
                        setWarning("Wrong password");
                        setIsLoading(false)
                    }, 4000)
                }
            })

            // reauthenticate(password)

            // if (error === "Successfully authenticated") {
            //     console.log("function invoked")
            //     handleFunction(data);
    
            //     setTimeout(() => {
            //         isPassword ? setWarning("Successfully changed Password") : setWarning("Successfully changed Email")
            //     }, 4000)
            //     clearData()
            // }

            //console.log(error)

            // if (!error) {
            //     handleFunction(data);
    
            //     setTimeout(() => {
            //         isPassword ? setWarning("Successfully changed Password") : setWarning("Successfully changed Email")
            //     }, 4000)
            //     clearData()
            // }

            // if (error === "Firebase: Error (auth/wrong-password).") {
            //     setTimeout(() => {
            //        setWarning("Wrong password");
            //     }, 4000)
            // }
        }
    }

    const clearData = () => {
        setData('')
        setConfirmData('')
        setPassword('')
    }

    // console.log("isPassword: ", isPassword)
    // console.log("data: ", data)
    // console.log("confirm: ",confirmData)
    // console.log("pw: ", password)

  return (
    <form>

        {/* { error && <h3 style={{color: "red"}}>{ error }</h3>} */}
        { warning && <h3 style={{color: "red"}}>{ warning }</h3> }
        <InputLabel htmlFor="email" style={{fontSize: "15px", marginBottom: '10px'}}>
            <span>{ isPassword ? "Enter New Password: " : "Enter New Email: "} </span>
                <Input sx={{width:'20ch'}}
                type={ isPassword ? "password" : "text" }

                value={data} 
                onChange={(e) => setData(e.target.value)}
                ></Input>                   
        </InputLabel>

        <InputLabel htmlFor="email" style={{fontSize: "15px", marginBottom: '10px'}}>
            <span>{ isPassword ? "Confirm New Password: " : "Confirm New Email: "} </span>
                <Input sx={{width:'20ch'}}
                type={ isPassword ? "password" : "text" }

                value={confirmData} 
                onChange={(e) => setConfirmData(e.target.value)}
                ></Input>                   
        </InputLabel>
        <InputLabel htmlFor="email" style={{fontSize: "15px"}}>
            <span>Enter Password: </span>
                <Input sx={{width:'20ch'}}
        
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                ></Input>                   
        </InputLabel>
        <div style={{width: '100%', display:"flex", justifyContent:'center'}}>
            <Button 
                    size="large" 
                    variant="outlined"
                    style={{marginBottom: '20px', marginTop:'20px'}}
                    sx={{
                        width:'25ch',
                    }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                    >Submit</Button>
        </div>
    </form>
  )
}