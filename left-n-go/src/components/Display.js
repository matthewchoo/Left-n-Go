import React from 'react';
import DisplayProduct from './DisplayProduct';


export default function Main(props) {
   
    // console.log({products});

    console.log(props);
    const rows = [...Array(Math.ceil(props.products.length/3))]

    const productRows = rows.map ((row,idx) => props.products.slice(idx * 3, idx * 3 + 3));

    const content = productRows.map((row, idx) => (
        <div className="row" key={idx}>
            {row.map(product => <DisplayProduct key={product.id} product={product}></DisplayProduct> )}
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
