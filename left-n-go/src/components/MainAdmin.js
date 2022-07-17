import React from 'react'
import { useCollection } from "../hooks/useCollection";

export default function MainAdmin(props) {

    const {orders} = props;
    const { documents: ordersFetched } = useCollection("orders");
    
    console.log(orders)
    return ( 
        <main className = "block col-2">
        <div className ="container-app">
            
            <h1 className="ordersHeader">ALL ORDERS</h1>
            {/* specficItems(user.email).map */}
            
            {   ordersFetched.map( (x) => {
                const a = x.name
                const boxColour = x.completed ? 'green' : 'blue'
                const checker = x.completed ? 'Collected:' : '[Paid] To Collect:'
                return(
                    <div className={"ordersBox" + boxColour} key={x.id}>
                    <strong>Order No: {x.id}</strong>
                    <div>
                    <strong>{checker} from {x.vendorMail} </strong>
                    </div>
                    <div>
                    <strong> Sold to {x.cusMail}</strong> 
                    </div>
                    <h3>{a}
                        <h4>
                            Qty: {x.quantity}
                        </h4>
                    </h3>
                    <h2 ><img className="wrap" src={ x.imageURL } alt={x.name}></img>
                    
                    
                    </h2>
                    </div>
                )

            })}


        </div>
        </main>
     );
}
