import MainVendor from "../components/MainVendor";
import BasketVendor from "../components/BasketVendor"
// import data from '../data';


const Home = (props) => {
    // const { products } = data;
    const  products  = props.products;

    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <div style = {{display: "flex",flexFlow: "row nowrap"}}>
                <div className="HeaderBox" style={{flex: 1}}>
                    <div className="row">
                        <MainVendor products={products}></MainVendor>
                        <BasketVendor></BasketVendor>
                    </div>
                </div>

                <script src="components.js" type="text/babel"></script>
                
                
                
    
            </div>
            {/* <p>To be Continued.</p> */}
        </div>
     );
}
 
export default Home