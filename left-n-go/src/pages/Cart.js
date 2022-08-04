// import {  firestore } from "../config/firebaseConfig";
// import { collection, query, where, getDocs, onSnapshot} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { useCollection } from "../hooks/useCollection";
//import { useState } from "react";

const Cart = (props) => {

    // const [ orDe , setOrders] = useState([])
    const { user, userType } = useAuth();

    const q = ["cusMail", "==", user.email];


    const { documents: ordersFetched } = useCollection("orders", q);
    const { documents: allOrdersFetched } = useCollection("orders");
    const orderType = userType === 'Cust' ? ordersFetched : allOrdersFetched

    /** 
    const FindAddr = (emailAddr) => {
        const queryForAddr = ["email", "==", emailAddr]
        const { documents: vendorFetched } = useCollection("users",queryForAddr);
        console.log("hi")
        setVendorAddr(vendorFetched.addr)
    }*/

    return ( 
        
        <div className ="container-app">
            
            <h1 className="ordersHeader">ORDERS</h1>
            <h1 className="ordersHeader"> No. of Orders : {orderType.length}</h1>

            {/* specficItems(user.email).map */}
            

            {   orderType.map( (x) => {
                const a = x.name
                const boxColour = x.completed ? 'green' : 'blue'
                const checker = x.completed ? '[Collected/Paid]:' : '[To Collect]:'
                //FindAddr(x.vendorMail)
                

                return(
                    <div className={"ordersBox" + boxColour} key={x.id}>
                    <strong>{checker} at {x.collectionPt}</strong> 
                    <h2 ><img className="wrap" src={ x.imageURL } alt={x.name}></img>
                    <p style={{display:"inline"}} className="cartText">
                        <u><i>{a}</i></u> by {x.vendorMail}<br />   
                        Order ID: { x.id } <br />
                        Qty: {x.quantity} <br />
                        
                    </p> 
                    </h2>
                    </div>
                )

            })}


        </div>
        
     );
}
 
export default Cart;