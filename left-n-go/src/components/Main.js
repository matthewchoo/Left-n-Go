import React from 'react';



export default function Main(props) {
    const {onAdd} = props;
    // console.log({products});

    
    //const rows = [...Array(Math.ceil(props.products.length/3))]

    //const productRows = rows.map ((row,idx) => props.products.slice(idx * 3, idx * 3 + 3));

    const content = props.products.map((product) => (
        <div className = "product-card grow" key={product.id}>
                <div className="containers">
                    <div className="product-image">
                        <img className="small" src={ product.imageURL } alt={product.name}></img>
                        
                    </div>
                </div>
                
                <div className="product-info">
                    <h3>{ product.name }</h3>
                    <p> Qty Available: { product.quantity }</p>
                    <h4>${ product.price }</h4>
                </div>
                <div>
                    <button onClick={ () => onAdd(product)}>Add To Cart</button>
                </div>
            </div>
        )
    );

    return (
        <main className = "block col-2">
            <section className = "products">{content}</section>
                
            
            
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
