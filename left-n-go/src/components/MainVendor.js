import React from 'react';
import { useAuth } from "../hooks/useAuth";
import { useCollection } from "../hooks/useCollection";

export default function MainVendor(props) {
    
    const { user } = useAuth();
    
    const q = ["vendorMail", "==", user.email];

    const { documents: productsFetched } = useCollection("products", q);
    const ownProducts = productsFetched

    const listd = ownProducts.length > 1 ? "Listings" : "Listing"

    const content = ownProducts.map((product) => (
        <div className = "product-card-vendor grow" key={product.id}>
                <div className="containers">
                    <div className="product-image">
                        <img className="small" src={ product.imageURL } alt={product.name}></img>
                        
                    </div>
                </div>
                
                <div className="product-info">
                    Name: <strong>{ product.name }</strong>
                    <br></br>
                    Product ID: <strong>{product.id}</strong>
                    <br></br>
                    Price: <strong>${ product.price }</strong>
                    <br></br>
                    Description : <strong>{product.description}</strong>
                    <br></br>
                    Quantity Left: <strong>{product.quantity}</strong>
                    
                </div>

            </div>
        )
    );




    return (
        <main className = "block col-2">
            <div><h2>Number of {listd}: {ownProducts.length}</h2></div>
            <div className="products-vendor">
                {content}
            </div>
        </main>
    )
    
}
