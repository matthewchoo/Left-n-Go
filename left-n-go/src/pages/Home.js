const Home = () => {
    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <div style = {{display: "flex",flexFlow: "row nowrap"}}>
                <div className="HeaderBox" style={{flex: 1}}>
                    <h2 class = 'pTitle'>Products</h2>
                    <div id='product-catalog'><h1>hi</h1></div>
                </div>
                
                
                
                
                
                <div className="HeaderBox" style={{flex: 1, textAlign: "right"}}><h2>Placeholder 2 (For Cart/Checkout)</h2></div>
            </div>
            {/* <p>To be Continued.</p> */}
        </div>
     );
}
 
export default Home