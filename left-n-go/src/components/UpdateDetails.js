import { Input, InputLabel, Button } from "@mui/material"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

//To pass in the db function, changeEmail/change pass function
//isPassword (determines the text field type), function() -> change email/pw
//submit will be the function
export default function UpdateDetails({ isPassword, handleFunction }) {
    const { user } = useAuth();

    const [ data, setData ] = useState('')
    const [ confirmData, setConfirmData ] = useState('')

    const handleSubmit = () => {

        //Need to reauthenticate user

        // handleFunction(data)
    }

    console.log(user.email)
  return (
    <form>
        <InputLabel htmlFor="email" style={{fontSize: "15px", marginBottom: '10px'}}>
            <span>Enter New Email: </span>
                <Input sx={{width:'20ch'}}
                // type={emailValues.showPassword ? "text" : "password"}
                //Upon onChange event, the email is setted.
                value={"123"}
                ></Input>                   
        </InputLabel>
        <InputLabel htmlFor="email" style={{fontSize: "15px", marginBottom: '10px'}}>
            <span>Confirm New Email: </span>
                <Input sx={{width:'20ch'}}
                // type={emailValues.showPassword ? "text" : "password"}
                //Upon onChange event, the email is setted.
                value={"123"}
                ></Input>                   
        </InputLabel>
        <InputLabel htmlFor="email" style={{fontSize: "15px"}}>
            <span>Enter Password: </span>
                <Input sx={{width:'20ch'}}
                // type={emailValues.showPassword ? "text" : "password"}
                //Upon onChange event, the email is setted.
                value={"123"}
                type="password"
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
                    onClick={() => {}}
                    >Submit</Button>
        </div>
    </form>
  )
}