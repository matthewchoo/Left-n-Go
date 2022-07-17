import React from 'react'
import { useCollection } from "../hooks/useCollection";

import { useAuth } from "../hooks/useAuth";

export default function OrdersVendor() {
    //**un comment bottom three lines when routing fixed for vendors */
    const { user } = useAuth();
    const q = ["vendorMail", "==", user.email];
    const { documents: ordersFetched } = useCollection("orders",q);
    
    
    // console.log("hi")
    // console.log(ordersFetched)
    return (

    <div className="checkList">
        <div className="title"><strong>--</strong></div>
        <div className="list-container text-left">
        {ordersFetched.map((x) => (
            <div key={x.id}>
               <span>{x.name} x{x.quantity}</span>
            </div>
        ))}
      </div>
    </div>

  );
}
