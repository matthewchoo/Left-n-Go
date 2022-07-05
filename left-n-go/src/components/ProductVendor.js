import React from 'react'
// import data from '../data';

export default function ProductVendor(props) {
    // const {products} = data;
    const { product } = props;
    // console.log(props)
    // Edit function will be edited soon ** take in info and reupload to database.

    return (
        <div>
            <img className="small" src={ product.imageURL } alt={product.name}></img>
            
            <h3>{ product.name } / {product.id}</h3>
            <div><strong>${ product.price }</strong></div>
            <div><strong>Description : {product.description}</strong> </div>
        
            <div>
            <strong>Quantity Left: {product.quantity}</strong>
            </div>
        </div>
    )
}
