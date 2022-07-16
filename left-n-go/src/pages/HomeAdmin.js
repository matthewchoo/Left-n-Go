import MainAdmin from "../components/MainAdmin";
import BasketAdmin from "../components/BasketAdmin"
import data from '../data';


const HomeAdmin = () => {
    const {orders} = data;

    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <div style = {{display: "flex",flexFlow: "row nowrap"}}>
                <div className="HeaderBox" style={{flex: 1}}>
                    <div className="row">
                        <MainAdmin orders={orders}></MainAdmin>
                        <BasketAdmin orders={orders}></BasketAdmin>
                    </div>
                </div>

                <script src="components.js" type="text/babel"></script>
                
                
                
    
            </div>
            {/* <p>To be Continued.</p> */}
        </div>
     );
}
 
export default HomeAdmin