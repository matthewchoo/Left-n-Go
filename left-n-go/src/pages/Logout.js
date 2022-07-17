import { Link } from "react-router-dom";

const Logout = () => {
    return ( 
        <div className="logout" align="center">
            <h2>You have Successfully Signed Out</h2>
            <Link to='/' style={{textDecoration: "underline"}}>Back to homepage...</Link>
        </div>
     );
}
 
export default Logout