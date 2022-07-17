import React from 'react';



export default function Main(props) {
   
    // console.log({products});

    // console.log(props);
    //const rows = [...Array(Math.ceil(props.products.length/3))]

    //const productRows = rows.map ((row,idx) => props.products.slice(idx * 3, idx * 3 + 3));

    const content = props.products.map((product) => (
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
            <div className="products-vendor">
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
