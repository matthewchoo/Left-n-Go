import { Link } from "react-router-dom";

const Logout = () => {
    return ( 
        <div className="logout" align="center">
            <h2>You have Successfully Signed Out</h2>
            <Link to='/'>Back to the homepage...</Link>
        </div>
     );
}
 
export default Logout