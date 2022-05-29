import { IconButton, InputLabel, Input, InputAdornment, Button } from '@mui/material';
import { Visibility, VisibilityOff, Google, GitHub } from "@mui/icons-material";
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const [passValues, setPassValues] = useState({
        password: "",
        showPassword: false,
    });

    const [emailValues, setEmailValues] = useState({
        email: "",
    });

    // const [loginDetails, setLoginDetails] = useState(
    //     []
    // );

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

    function handleSubmit(event) {
        event.preventDefault();

        // const loginData = {
        //     email: emailValues,
        //     password: passValues
        // }
        // setLoginDetails(loginData);

        // signin(emailValues.email, passValues.password);

        signin(emailValues.email, passValues.password);
        // console.log(emailValues.email);
        // console.log(passValues.password);
        // console.log(loginData);
        // console.log(loginDetails);
        // signin(loginData.email, loginData.password);
    };

    // function handleRegister(event) {
    //     event.preventDefault();

    //     signup(emailValues.email, passValues.password);
    // };

    const { signin, signInWithGoogle, signInWithGitHub } = useAuth();
    // signup, 

return (
	<div
	className="login">
    
        <h2>Welcome Back</h2>
        <p>Login with your email & password</p>

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
            <InputLabel htmlFor="standard-adornment-password" style={{fontSize: "15px"}}>
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

        <div style={{marginBottom: "10px"}}>
            <Button sx={{width:'29ch'}} 
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
            color="primary"
            startIcon={<Google style={{fill: 'white'}}/>}
            onClick={signInWithGoogle}
            >Sign in With Google</Button>
        </div>
        
        <div style={{marginBottom: "10px"}}>
        <Button sx={{width:'29ch'}} 
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
            color="primary"
            startIcon={<GitHub style={{fill: 'white'}}/>}
            onClick={signInWithGitHub}
            >Sign in With GitHub</Button>
        </div>

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

    // const [name, setName] = useState("");
    // onClick = (() => {
    //     const newEmail = prompt("Enter your email");
    // });
