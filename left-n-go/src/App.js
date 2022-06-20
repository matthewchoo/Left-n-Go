import './App.css';
import Navbar from './Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ProfileVendor from './pages/ProfileVendor';
import HomeVendor from './pages/HomeVendor'
// import data from './data';

//import VendorProfile from './pages/ProfileVendor';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { Logout } from '@mui/icons-material';
//import { useAuth } from './hooks/useAuth';

function App() {
  // const { user } = useAuth();

  // const { products } = data;

  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Once set up, page can check if signed in, if Yes, check vendor or customer and show specific navbar*/}        
        
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/vendorProfile">
              <ProfileVendor />
            </Route>
            <Route path="/HomeVendor">
              <HomeVendor />
            </Route>
            
            <Route path="*"> {/* Catchall Route for route that doesn't exist on top. */}
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
