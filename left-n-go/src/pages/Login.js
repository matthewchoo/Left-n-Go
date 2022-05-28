import { IconButton, InputLabel, Input, InputAdornment, Button } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from 'react';

const Login = () => {
    const [passValues, setPassValues] = useState({
        password: "",
        showPassword: false,
    });

    const [emailValues, setEmailValues] = useState({
        email: "",
    });

    const [loginDetails, setLoginDetails] = useState(
        []
    );

    const handleClickShowPassword = () => {
        setPassValues({ ...passValues, showPassword: !passValues.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setPassValues({ ...passValues, [prop]: event.target.value });
        // console.log("current password ," + passValues.password);
        // console.log("setted password ," + setPassValues.password);
    };

    const handleEmailChange = (prop) => (event) => {
        setEmailValues({ ...emailValues, [prop]: event.target.value });
        // console.log("current email ," + emailValues.email);
        // console.log("setted email ," + setEmailValues.email);
    };

    // const [name, setName] = useState("");
    // onClick = (() => {
    //     const newEmail = prompt("Enter your email");
    // });

    function handleSubmit(event) {
        event.preventDefault();
        
        const loginData = {
            email: emailValues,
            password: passValues
        }
        setLoginDetails(loginData);

        console.log(loginData);
    };

    // const onSubmit = (data) => {
    //     console.log(data);
    //   };

return (
	<div
	className="login">
    
    <h2>Welcome Back</h2>
    <p>Login with your email & password</p>

    <form onSubmit={handleSubmit}>
        {/* For Email */}
        <InputLabel htmlFor="email">
            Enter your Email
        </InputLabel>
        <Input sx={{width:'25ch'}}
            // type={emailValues.showPassword ? "text" : "password"}
            //Upon onChange event, the email is setted.
            onChange={handleEmailChange("email")}
            value={emailValues.email}
        />

        {/* For Password */}
        <InputLabel htmlFor="standard-adornment-password">
            Enter your Password
        </InputLabel>
        <Input sx={{width:'25ch'}} style={{
            marginBottom: "30px",
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
            >Login</Button></div>

            <div className="otherLogin">
                <p style={{
                color: "#000000",
                marginTop: "30px",
                textAlign: "center",
                fontSize: "15px",
                // margin-bottom: 30px;
                // width: auto;
                }}>Login with other methods</p>
            </div>
        </form>
	</div>
    
);
};

export default Login;

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     return ( 
//         <div className="login" align="center">

//             <h2>Login</h2>
            
//             <p>To continue with firebase auth, coupled with registration</p>
//         </div>
//      );
// }
 
// export default Login;

// <div
// 	style={{
// 		marginLeft: "30%",
//         align: "center",
// 	}}
// 	></div>

