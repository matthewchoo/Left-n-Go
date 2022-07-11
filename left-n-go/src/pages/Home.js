import Main from "../components/Main";
import Basket from "../components/Basket"
import { useState } from "react";
// import { getItems } from "../config/firebaseConfig";

// import data from '../data';
// import { collection, getDocs } from "firebase/firestore";
// import { firestore } from "../config/firebaseConfig";

const Home = (props) => {

    // let tryProducts = [];

    // getItems().forEach((items) => {
    //     tryProducts.push({...items.data(), id : items.id})
    // });

    //using database's data
    const products = props.products;
    
    //Using data from ../data
    //const products = data;

    // console.log(products)

    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        
        const exist = cartItems.find(x => x.id === product.id);
        //console.log(exist.qty);
        if (exist) {
            setCartItems(
                cartItems.map( (x) => 
                    x.id === product.id ? exist.qty < x.quantity ? {...exist, qty: exist.qty + 1} : x : x
                )
            );
        } else {
            setCartItems([...cartItems, {...product, qty: 1}]);
        }
    };

    const onRemove = ( product ) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
            setCartItems(
                cartItems.map( (x) => 
                    x.id === product.id ? {...exist, qty: exist.qty - 1} : x
                )
            );
        }
    }
    
    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <div style = {{display: "flex",flexFlow: "row nowrap"}}>
                <div className="HeaderBox" style={{flex: 1}}>
                    <div className="row">
                        <Main onAdd={onAdd} products={products}></Main>
                        <Basket onAdd={onAdd} onRemove={onRemove} cartItems={cartItems}></Basket>
                    </div>
                </div>

                <script src="components.js" type="text/babel"></script>
                
                
                
    
            </div>
            {/* <p>To be Continued.</p> */}
        </div>
     );
}
 
export default Home
