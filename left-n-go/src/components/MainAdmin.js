import React from 'react'
import { useCollection } from "../hooks/useCollection";

export default function MainAdmin(props) {

    // const {orders} = props;
    const { documents: ordersFetched } = useCollection("orders");
    
    // console.log(orders)
    return ( 
        <main className = "block col-2">
        <div className ="container-app">
            
            <h1 className="ordersHeader">ALL ORDERS</h1>
            {/* specficItems(user.email).map */}
            
            {   ordersFetched.map( (x) => {
                const a = x.name
                const boxColour = x.completed ? 'green' : 'blue'
                const checker = x.completed ? 'Collected:' : 'Not Collected Yet:'
                return(
                    <div className={"ordersBox" + boxColour} key={x.id}>
                    <strong>Order No: {x.id}</strong>
                    <div>
                    <strong>{checker} by {x.vendorMail} </strong>
                    </div>
                    <div>
                    <strong> Sold to {x.cusMail}</strong> 
                    </div>
                    <h3>{a} <br />
                        Qty: {x.quantity}
                    </h3>
                    <img className="wrap" src={ x.imageURL } alt={x.name}></img>
                    
                    </div>
                )

            })}


        </div>
        </main>
     );
}
