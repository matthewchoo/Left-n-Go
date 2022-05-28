import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import NotFound from './NotFound';
import Cart from './Cart';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
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
