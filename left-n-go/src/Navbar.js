//A Functional component, Navbar, it will be available throughout the whole of the site.
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1><a href = "/home" style={{
                    color: "black"
                }}>Left-n-Go</a></h1>

            <div className="links">
                <a href = "/cart">Cart</a>
                <a href = "/login">Sign In</a>
            </div>
        </nav>
     );
}
 
export default Navbar;
