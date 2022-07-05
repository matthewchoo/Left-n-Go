import React from 'react';
import { Link } from 'react-router-dom';
import OrdersVendor from './OrdersVendor';

export default function BasketVendor(props) {

    return <aside className="block col-1">
        <h2>Actions</h2>
        <hr></hr>
        <div className="col-2 text-left">
            <button onClick={() => console.log("Add Product")} className="add">
            <Link to="/addProduct" style={{color:'white'}}>+ </Link>
            </button> <strong>Add Product</strong>
        </div>

        <div className="col-2 text-left">
            <button onClick={() => console.log("Edit Product")} className="edit">
            <Link to="/updateProduct">x</Link>
            </button> <strong>Edit Product</strong>
        </div>

        <div className="col-2 text-left">
            <button onClick={() => console.log("Remove Product")} className="remove">
            <Link to="/deleteProduct">-</Link>
            </button> <strong>Remove Product</strong>
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