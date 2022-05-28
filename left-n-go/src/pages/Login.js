const Login = () => {
    return ( 
        <div className="login">
            <h2>Login</h2>
            <div style = {{display: "flex",flexFlow: "row nowrap"}}>
                <div className="HeaderBox" style={{flex: 1}}><h2>Placeholder 1 (For Products)</h2></div>
                <div className="HeaderBox" style={{flex: 1, textAlign: "right"}}><h2>Placeholder 2 (For Cart/Checkout)</h2></div>
            </div>
            <p>To continue with firebase auth, coupled with registration</p>
        </div>
     );
}
 
export default Login;

