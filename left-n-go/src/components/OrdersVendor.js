import React from 'react'
import { useCollection } from "../hooks/useCollection";
//import MButton from './MButton';
import { useAuth } from "../hooks/useAuth";
import { doc, runTransaction } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

export default function OrdersVendor() {
    //**un comment bottom three lines when routing fixed for vendors */
    const { user } = useAuth();
    const q = ["vendorMail", "==", user.email];
    const { documents: ordersFetched } = useCollection("orders", q);
    
    
    const markComplete = async (data) => {
      const sfDocRef = doc(firestore, "orders", data.id);

      try {
          await runTransaction(firestore, async (transaction ) => {
              const sfDoc = await transaction.get(sfDocRef);
              if (!sfDoc.exists()) {
                  throw new Error("ID does not exist!");
              }
              
              transaction.update(sfDocRef, { completed: true,cusMail: data.cusMail, name: data.name,
              imageURL : data.imageURL, quantity: data.quantity, price: data.price, vendorMail: data.vendorMail});

          });
          // console.log("Transaction successfully committed!");
      } catch (e) {
          console.log("Transaction failed: ", e);
      }

      
  };

    // console.log("hi")
    // console.log(ordersFetched)
    return (

      <div className ="container-app-two">
            
      

      {   ordersFetched.map( (x) => {
          const a = x.name
          const boxColour = x.completed ? 'green' : 'blue'
          const checker = x.completed ? '[Completed]:' : '[To Prepare]'
          return(
              <div className={"ordersBox" + boxColour} key={x.id}>
                <strong>{checker} for {x.cusMail}</strong> 
                <br></br>
                <img className="wrap"  src={ x.imageURL } alt={x.name}></img>
                
                <p>Order ID: { x.id }</p>
                <aside>{a} | Qty: {x.quantity}
                
                <br></br>
                <button className={"right"+boxColour} onClick={() => x.completed ? alert("Already Completed") : markComplete(x)}>
                  Mark Complete
                </button></aside>
              
              </div>
          )

      })}


  </div>

  );
}
