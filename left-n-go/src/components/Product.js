import React from 'react'
// import data from '../data';

export default function Product(props) {
    // const {products} = data;
    const { product , onAdd } = props;
    // console.log(props)

    return (
        <div>
            <img className="small" src={ product.image } alt={product.name}></img>
            <h3>{ product.name }</h3>
            <div>${ product.price }</div>
        
            <div>
                <button onClick={ () => onAdd(product)}>Add To Cart</button>
            </div>
        </div>
    )
}
