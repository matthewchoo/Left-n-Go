import React from 'react';
import ProductVendor from './ProductVendor';


export default function MainVendor(props) {
    const {onAdd} = props;
    // console.log(props)
    
    const rows = [...Array(Math.ceil(props.products.length/3))]

    const productRows = rows.map ((row,idx) => props.products.slice(idx * 3, idx * 3 + 3));

    const content = productRows.map((row, idx) => (
        <div className="row" key={idx}>
            {row.map(product => <ProductVendor key={product.id} product={product} onAdd={onAdd}></ProductVendor> )}
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
    
}
