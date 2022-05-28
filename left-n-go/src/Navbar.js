//A Functional component, Navbar, it will be available throughout the whole of the site.

import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const Navbar = () => {
    const { user } = useAuth();

    return ( 
        <nav className="navbar">
            {/* Left align */}
            <Link to="/home"><h1>Left-n-Go</h1></Link> 
            {/* Can switch Left-n-Go into the Logo. */}

            {/* Right align */}
            <div className="links">
                <Link to="/cart">Cart</Link>
                { user ? <Link to="/">user</Link> : <Link to="/login">Sign In</Link> }
                {/* { user ? <Link to="/login">Sign In</Link> : <Link to="/notfound">TryOut</Link> } */}
                {/* <Link to="/login">Sign In</Link> */}
            </div>
        </nav>
     );
}
 
export default Navbar;
