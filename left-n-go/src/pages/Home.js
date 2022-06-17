import Main from "../components/Main";
import Basket from "../components/Basket"
import data from '../data';
import { useState } from "react";

const Home = () => {
    const { products } = data;
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find(x => x.id === product.id);
        if (exist) {
            setCartItems(
                cartItems.map( (x) => 
                    x.id === product.id ? {...exist, qty: exist.qty + 1} : x
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
