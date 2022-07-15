


const Cart = (props) => {

    const orders = props.orders;

    return ( 
        <div className ="container-app">
            <h1 className="ordersHeader">ORDERS</h1>
            {orders.map( (x) => {
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