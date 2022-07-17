import React from 'react'
// import data from '../data';

export default function Product(props) {
    // const {products} = data;
    const { product , onAdd } = props;
    // console.log(props)

    return (
        
            <div className = "product-card">
                <div className="product-image">
                    <img className="small" src={ product.imageURL } alt={product.name}></img>
                </div>
                <div className="middle">
                    <div className="product-text">Hello</div>
                </div>
            
                <div className="product-info">
                    <h3>{ product.name }</h3>
                    
                    <h4>$10</h4>
                </div>
                <div>
                    <button onClick={ () => onAdd(product)}>Add To Cart</button>
                </div>
            </div>
        
        
    )
}
