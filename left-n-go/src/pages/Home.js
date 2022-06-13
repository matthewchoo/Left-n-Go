import Main from "../components/Main";
import Basket from "../components/Basket"

const Home = () => {
    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <div style = {{display: "flex",flexFlow: "row nowrap"}}>
                <div className="HeaderBox" style={{flex: 1}}>
                    <div className="row">
                        <Main></Main>
                        <Basket></Basket>
                    </div>
                </div>

                <script src="components.js" type="text/babel"></script>
                
                
                
    
            </div>
            {/* <p>To be Continued.</p> */}
        </div>
     );
}
 
export default Home