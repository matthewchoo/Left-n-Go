import React from 'react'
import { useCollection } from "../hooks/useCollection";


export default function BasketAdmin() {

    const q = ["userType", "!=", "Admin"];
    const { documents: usersFetched } = useCollection("users",q);
    
    return ( 
        <main className = "block col-2">
        <div className ="container-app">
            
            <h1 className="ordersHeader">ALL Users</h1>
            {/* specficItems(user.email).map */}
            
            {   usersFetched.map( (x) => {
                
                const boxColour = x.userType === 'Cust' ? 'green' : 'blue'
                
                return(
                    <div className={"ordersBox" + boxColour} key={x.uid}>
                        <strong>Account ID: {x.uid}</strong>
                        <div>
                            <h3>Email: {x.email}</h3>
                            <hr></hr>
                            <h4>Type: {x.userType}</h4>
                        </div>
                    </div>
                )

            })}


        </div>
        </main>
     );
}