import './App.css';
import Navbar from './Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ProfileVendor from './pages/ProfileVendor';
import HomeVendor from './pages/HomeVendor'
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import DeleteProduct from './pages/DeleteProduct';
// import data from './data';

//import VendorProfile from './pages/ProfileVendor';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { firestore } from './config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

// import { useEffect } from 'react';
//import { Logout } from '@mui/icons-material';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  // const { products } = data;

  //To set Initial state
  
  
const collectionRef = collection(firestore, "products");

  let products = [];
  
  getDocs(collectionRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id })
    });
    // products.forEach(product => {
    //   console.log("IMAGE URL")
    //   console.log(product.imageURL)
    // })
  }).catch(err => {
    console.log(err.message);
  });

  // const fetchData = async () => {
  //   await getItems().then((data) => {
  //     data.forEach((doc) => {
  //       products.push({ ...doc.data, id: doc.id })
  //     });
  //     console.log(data);
  //     //setDbData(data);
  //   });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // console.log("DBData:" + dbData);

  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Once set up, page can check if signed in, if Yes, check vendor or customer and show specific navbar*/}        
        
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home products={ products }/>
              {/* <Home /> */}
            </Route>
            <Route path="/home">
              <Home products={ products }/>
              {/* <Home /> */}
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/login">
              { user ? <Redirect to="/home"/> : <Login /> }
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/vendorProfile">
              <ProfileVendor />
            </Route>
            <Route path="/addProduct">
              <AddProduct />
            </Route>
            <Route path="/updateProduct">
              <UpdateProduct products={products}/>
            </Route>
            <Route path="/deleteProduct">
              <DeleteProduct products={products}/>
            </Route>
            <Route path="/HomeVendor">
              <HomeVendor products={ products }/>
              {/* <Home /> */}
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
