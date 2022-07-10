import React from 'react'
// import data from '../data';

export default function Product(props) {
    // const {products} = data;
    const { product } = props;
    // console.log(props)
    
    return (
        <div>
            <img className="small" src={ product.imageURL } alt={product.name}></img>
            <h3>Name:{ product.name }</h3>
            <div>ID:{ product.id }</div>
            <div>Quantity:{ product.quantity }</div>
            <div>${ product.price }</div>

        </div>
    )
}
