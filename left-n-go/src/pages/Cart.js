// import {  firestore } from "../config/firebaseConfig";
// import { collection, query, where, getDocs, onSnapshot} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
// import { useState } from "react";
import { useCollection } from "../hooks/useCollection";

const Cart = (props) => {

    // const [ orDe , setOrders] = useState([])
    const { user } = useAuth();
    // const orders = props.orders;

    const q = ["cusMail", "==", user.email];

    const { documents: ordersFetched } = useCollection("orders", q);
    
    // const specficItems = async (cMail) => {
    //     const q = query(collection(firestore,"orders"), where("cusMail","==",cMail));
    //     // const querySnapshot = await getDocs(q)
    //     // let results = []

    //     // querySnapshot.forEach((doc) =>{
    //     //     console.log(doc.data())
    //     //     // results.push({...doc.data(), id: doc.cMail})
    //     // });

    //     onSnapshot(q, (snapshot) => {
    //         let results = []
    //         snapshot.docs.forEach(doc => {
    //             console.log(doc.data())
    //             results.push({...doc.data(), id: doc.id})
    //             console.log("results", results)
    //         })
    //         setOrders(results)
    //     })

    //     // setOrders(results)
    // };

    // console.log("order", orDe)
    

    return ( 
        
        <div className ="container-app">
            
            <h1 className="ordersHeader">ORDERS</h1>
            {/* specficItems(user.email).map */}
            
            {   ordersFetched.map( (x) => {
                const a = x.name
                const boxColour = x.completed ? 'green' : 'blue'
                const checker = x.completed ? 'Collected:' : '[Paid] To Collect:'
                return(
                    <div className={"ordersBox" + boxColour} key={x.id}>
                    <strong>{checker} from {x.vendorMail}</strong> 
                    
                    <h2 ><img className="wrap" src={ x.imageURL } alt={x.name}></img>
                    <p style={{display:"inline"}} className="cartText">
                        {a} <br />  
                        Qty: {x.quantity}
                    </p> 
                    </h2>
                    </div>
                )

            })}


        </div>
        
     );
}
 
export default Cart;