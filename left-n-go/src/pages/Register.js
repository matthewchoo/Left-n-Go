import { useProvideAuth } from "../hooks/useProvideAuth";
import { useState } from "react";

import { IconButton, InputLabel, Input, InputAdornment, Button, NativeSelect } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Register = () => {
    const { signup, error } = useProvideAuth();

    const [passValues, setPassValues] = useState({
        password: "",
        showPassword: false,
    });
  
    const [emailValues, setEmailValues] = useState({
        email: "",
    });

    const [confirmPass, setConfirmPass] = useState('');

    const [ userType, setUserType ] = useState('Cust')
  
    const handleClickShowPassword = () => {
        setPassValues({ ...passValues, showPassword: !passValues.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setPassValues({ ...passValues, [prop]: event.target.value });
    };

    const handleEmailChange = (prop) => (event) => {
        setEmailValues({ ...emailValues, [prop]: event.target.value });
    };  

    //warning is for password not match/not enough characters
    const [ warning, setWarning ] = useState('')

    //password should be at least 6 characters


    //   console.log("The email is : ", emailValues.email)
    //   console.log("The password is : ", passValues.password)
    //   console.log("The confirmPass is : ", confirmPass)
    //   console.log("The userType is : ", userType)
    //   console.log(passValues.password.trim() === confirmPass.trim())
    //   console.log(confirmPass.toString().length)
  
      function handleSubmit(event) {
        event.preventDefault();

        if (passValues.password.trim() !== confirmPass.trim()) {
            setWarning("Password do not match")
        } else if (passValues.password.toString().length < 6) {
            setWarning ("Password have to be more than 6 characters")
        } else {
            setWarning('')
            // console.log("(submit) The email is : ", emailValues.email)
            // console.log("(submit) The password is : ", passValues.password)
            // console.log("(submit) The confirmPass is : ", confirmPass)

            signup(emailValues.email, passValues.password, userType);
            // If signup success, there will not be any error messages, user
            // will be redirected to the homepage upon signup.
            // setWarning("Success")
            clearData()
        }

          //signup(emailValues.email, passValues.password, userType);
      };
  
      const clearData = () => {
        setPassValues({
            password: "",
            showPassword: false,
        })
        setEmailValues({
            email: "",
        })
        setConfirmPass('')
      }

    return ( 
        <div
            className="login">
        
            <h2>Register</h2>
            <p>Kindly enter your email & password below</p>

            { error && <h3 style={{color: "red"}}>{ error }</h3>}
            { warning && <h3 style={{color: "red"}}>{ warning }</h3>}

            <form onSubmit={handleSubmit}>
                {/* For Email */}
                <InputLabel htmlFor="email" style={{fontSize: "15px"}}>
                    Enter your Email
                </InputLabel>
                <Input sx={{width:'25ch'}}
                    // type={emailValues.showPassword ? "text" : "password"}
                    //Upon onChange event, the email is setted.
                    onChange={handleEmailChange("email")}
                    value={emailValues.email}
                />

                {/* For Password */}
                <InputLabel htmlFor="standard-adornment-password" style={{fontSize: "15px", marginTop: '30px'}}>
                    Enter your Password
                </InputLabel>
                <Input sx={{width:'25ch'}} style={{
                    marginBottom: "30px"
                }}
                    type={passValues.showPassword ? "text" : "password"}
                    onChange={handlePasswordChange("password")}
                    value={passValues.password}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {passValues.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                <InputLabel htmlFor="confirm-password" style={{fontSize: "15px"}}>
                    Confirm your Password
                </InputLabel>
                <Input sx={{width:'25ch'}} style={{
                    marginBottom: "30px"
                }}
                    type="password"
                    // onChange={handleConfirmPasswordChange("password")}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    value={confirmPass}
                />

                <InputLabel htmlFor="confirm-userType" style={{fontSize: "15px"}}>
                    Select User
                </InputLabel>
                <NativeSelect
                        inputProps={{
                        name: 'userType',
                        id: 'uncontrolled-native',
                        }}
                        sx={{width:'25ch'}}
                        style={{
                            marginBottom: "30px"
                        }}
                        value={ userType }

                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value={"Cust"}>Customer</option>
                        <option value={"Vendor"}>Vendor</option>
                </NativeSelect>

                <div><Button sx={{width:'29ch'}} 
                style={
                    {
                        // background: "#f1356d",
                        background: "#5297FF",
                        color: "#fff",
                        border: "0",
                        padding: "8px",
                        borderRadius: "10px",
                        cursor: "pointer",
                    }
                }
                type="submit"
                >Register</Button></div>
            </form>          

        </div>
     );
}
 
export default Register;