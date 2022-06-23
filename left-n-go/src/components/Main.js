import React from 'react';
import Product from './Product';


export default function Main(props) {
    const {onAdd} = props;
    // console.log({products});
    console.log(props);
    
    // Using database's data
    // const rows = [...Array(Math.ceil(props.products.length/3))]

    // const productRows = rows.map ((row,idx) => props.products.slice(idx * 3, idx * 3 + 3));

    // Using data.js's data
    const rows = [...Array(Math.ceil(props.products.products.length/3))]

    const productRows = rows.map ((row,idx) => props.products.products.slice(idx * 3, idx * 3 + 3));

    const content = productRows.map((row, idx) => (
        <div className="row" key={idx}>
            {row.map(product => <Product key={product.id} product={product} onAdd={onAdd}></Product> )}
        </div>
        )
    );

    return (
        <main className = "block col-2">
            <div>
                {content}
                
            </div>
            
        </main>
    )
    
    /*
    return <main className="block col-2">
        <h2>Products</h2>
        <div className="row">
            {products.map((product) => (
                <Product key={product.id} product={product} onAdd={onAdd}></Product>
            ))}
        </div>
    </main>
                */
}
