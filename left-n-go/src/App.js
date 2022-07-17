import './App.css';
import Navbar from './Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import HomeVendor from './pages/HomeVendor'
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import DeleteProduct from './pages/DeleteProduct';
import HomeAdmin from './pages/HomeAdmin';
// import data from './data';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { firestore } from './config/firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

//import { Logout } from '@mui/icons-material';
import { useAuth } from './hooks/useAuth';
// import { useState, useEffect } from 'react';
import { useCollection } from './hooks/useCollection';
import Register from './pages/Register';
import MainAdmin from './components/MainAdmin';


function App() {
  const { user, userType } = useAuth();
  // console.log(userType)
  // const [ products, setProducts ] = useState([])

  //Obtained the items from useCollection() hook, 
  //From useCollection() hook, exported { documents }, renamed it as "products"
  const { documents: products } = useCollection("products");
  const { documents: orders } = useCollection("orders");
  
  // products.length === 0 ? console.log("products still fetching") : console.log(products)
  
  // useEffect(() => {
  //   const collectionRef = collection(firestore, "products");
  //   getDocs(collectionRef).then((snapshot) => {
  //     let products = [];
  //     snapshot.docs.forEach((doc) => {
  //       products.push({ ...doc.data(), id: doc.id })
  //     });
  //     // products.forEach(product => {
  //     //   console.log("IMAGE URL")
  //     //   console.log(product.imageURL)
  //     // })
  //     setProducts(products)
  //   }).catch(err => {
  //     console.log(err.message);
  //   });
  // }, [])
  

  // console.log(products)


  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Once set up, page can check if signed in, if Yes, check vendor or customer and show specific navbar*/}        
        
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home products={ products }/>
              { user && userType === "Admin" && <MainAdmin /> }
              {/* <Home /> */}
            </Route>
            <Route path="/home">
              <Home products={ products }/>
              { user && userType === "Admin" && <MainAdmin /> }
              {/* <Home /> */}
            </Route>
            <Route path="/cart">
              <Cart orders = {orders}/>
            </Route>
            <Route path="/login">
              { user ? <Redirect to="/home"/> : <Login /> }
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            {/* <Route path="/vendorProfile">
              { user && userType === "Vendor" && <ProfileVendor /> }
              { user && userType === "Admin" && <ProfileVendor /> }
              { (!user || userType !== "Vendor" || userType !== 'Admin') && <Redirect to="/home"/> }
            </Route> */}
            <Route path="/profile">
              { user && userType === "Vendor" && <Profile /> }
              { user && userType === "Cust" && <Profile /> }
              { user && userType === "Admin" && <Profile /> }
              { !user && <Redirect to="/home"/> }
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

            <Route path="/register">
              { user ? <Redirect to="/home"/> : <Register /> }
            </Route>

            <Route path="/HomeAdmin">
              <HomeAdmin orders = {orders}></HomeAdmin>
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
