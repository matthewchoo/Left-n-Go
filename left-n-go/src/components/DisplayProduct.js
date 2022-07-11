import React from 'react'
// import data from '../data';

export default function Product(props) {
    // const {products} = data;
    const { product } = props;
    // console.log(props)

    const handleClick = async (id) => {
        console.log(id)
    }

    return (
        <div>
            <img className="small" src={ product.imageURL } alt={product.name} onClick={() => handleClick(product.id)}></img>
            <h3>Name:{ product.name }</h3>
            <div>ID:{ product.id }</div>
            <div>Quantity:{ product.quantity }</div>
            <div>${ product.price }</div>

        </div>
    )
}
