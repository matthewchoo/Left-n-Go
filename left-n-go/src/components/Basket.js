import React from 'react';

export default function Basket(props) {
    const {cartItems, onAdd, onRemove} = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const taxPrice = itemsPrice * 0.17;
    const totalPrice = itemsPrice + taxPrice;

    return <aside className="block col-1">
        <h2>Cart Items</h2>
        <div>
            {cartItems.length === 0 && <div>Cart is Empty. Please add something!</div>}
        </div>

        {cartItems.map((item) => (
            <div key={item.id} className = "rowBasket">
                <div className="col-2 text-left">{item.name}</div>
                <div className="col-2">
                    <button onClick={ () => onAdd(item) } className="add" >
                    +
                    </button>

                    <button onClick={ () => onRemove(item) } className="remove">
                    -
                    </button>
                </div>

                <div className="col-2 text-right">
                    {item.qty} x ${item.price}
                </div>

            </div>
        ))}

        {cartItems.length !== 0 && (
            <>
                <hr></hr>

                <div className="rowBasket">
                    <div className="col-2 text-left">Items Price</div>
                    <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                </div>

                <div className="rowBasket">
                    <div className="col-2 text-left">Tax Price</div>
                    <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                </div>
                
                <hr></hr>

                <div className="rowBasket">
                    <div className="col-2 text-left"><strong>Total Price</strong></div>
                    <div className="col-1 text-right"><strong>${totalPrice.toFixed(2)}</strong></div>
                </div>

                <div>
                    <button className="block" onClick={() => alert('Implement Checkout')}>
                        Checkout
                    </button>
                </div>
            </>

        )}

    </aside>;
}