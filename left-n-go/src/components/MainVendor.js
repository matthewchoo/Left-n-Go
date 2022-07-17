import React from 'react';
import ProductVendor from './ProductVendor';
import { useAuth } from "../hooks/useAuth";
import { useCollection } from "../hooks/useCollection";

export default function MainVendor(props) {
    const {onAdd} = props;
    const { user } = useAuth();
    
    const q = ["vendorMail", "==", user.email];

    const { documents: productsFetched } = useCollection("products", q);
    const ownProducts = productsFetched

    const rows = [...Array(Math.ceil(ownProducts.length/3))]

    const productRows = rows.map ((row,idx) => ownProducts.slice(idx * 3, idx * 3 + 3));

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
