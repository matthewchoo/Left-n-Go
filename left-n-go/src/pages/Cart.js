import {  firestore } from "../config/firebaseConfig";
import { collection, query, where, getDocs} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";

const Cart = (props) => {

    const [ orDe , setOrders] = useState([])
    const { user } = useAuth();
    const orders = props.orders;
    
    
    const specficItems = async (cMail) => {
        const q = query(collection(firestore,"orders"), where("cusMail","==",cMail));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) =>{
            console.log(doc.data())
            
        });

        
    };
    
    
    

    return ( 
        
        <div className ="container-app">
            
            <h1 className="ordersHeader">ORDERS</h1>
            
            {   specficItems(user.email).map( (x) => {
                const a = x.name
                const boxColour = x.completed ? 'green' : 'blue'
                const checker = x.completed ? 'Collected:' : '[Paid] To Collect:'
                return(
                    <div className={"ordersBox" + boxColour} key={x.id}>
                    <strong>{checker} from {x.vendorMail}</strong> 
                    
                    <h2 ><img className="wrap" src={ x.imageURL } alt={x.name}></img>
                    <h3 style={{display:"inline"}} className="cartText">{a}
                        <h4>
                        
                            Qty: {x.quantity}
                        </h4>
                            
                        
                    </h3> 
                    
                    </h2>
                    </div>
                )

            })}


        </div>
        
     );
}
 
export default Cart;