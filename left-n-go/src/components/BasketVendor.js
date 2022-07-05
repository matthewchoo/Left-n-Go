import React from 'react';
import { Link } from 'react-router-dom';
import OrdersVendor from './OrdersVendor';

export default function BasketVendor(props) {

    return <aside className="block col-1">
        <h2>Actions</h2>
        <hr></hr>
        <div className="col-2 text-left">
            <Link to="/addProduct" style={{color:'white'}}>
            <button onClick={() => console.log("Add Product")} className="add">
            +
            </button> <strong>Add Product</strong></Link>
        </div>

        <div className="col-2 text-left">
            <Link to="/updateProduct">
            <button onClick={() => console.log("Edit Product")} className="edit">
            x
            </button> <strong>Edit Product</strong></Link>
        </div>

        <div className="col-2 text-left">
            <Link to="/deleteProduct">
            <button onClick={() => console.log("Remove Product")} className="remove">
            -
            </button> <strong>Remove Product</strong></Link>
        </div>

        <hr></hr>

        <div className="col-2 text-left">
            <button onClick={() => console.log("Show Orders")} className= "orders">
            |||
            </button> <strong>Current Orders:</strong>
        </div>

        <div> <OrdersVendor/></div>
        <hr></hr>

    </aside>;
}