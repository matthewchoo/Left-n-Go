import React from 'react'
// import data from '../data';

export default function ProductVendor(props) {
    // const {products} = data;
    const { product } = props;
    // console.log(props)
    // Edit function will be edited soon ** take in info and reupload to database.

    return (
        <div>
            {/* Using database's data */}
            <img width="100px" height="100px" className="small" src={ product.imageURL } alt={product.name}></img>

            {/* Using data from ../data */}
            {/* <img className="small" src={ product.image } alt={product.name}></img> */}
            <h3>{ product.name }</h3>
            <div>${ product.price }</div>
        
            <div>
                <button onClick={ () => console.log("Edit Function")}>Edit</button>
            </div>
        </div>
    )
}
