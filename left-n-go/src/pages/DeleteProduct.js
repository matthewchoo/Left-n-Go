import {  Button, TextField } from "@mui/material";
import { useState } from "react";
import Display from "../components/Display";

import { Link } from 'react-router-dom';
import { doc, deleteDoc } from "firebase/firestore";
import {  firestore } from "../config/firebaseConfig";
import { useCollection } from "../hooks/useCollection";
import { useAuth } from "../hooks/useAuth";

const DeleteProduct = (props) => {

    const { user, userType} = useAuth();
    const q = ["vendorMail", "==", user.email];

    const { documents: productsFetched } = useCollection("products", q);
    const { documents: allProductsFetched } = useCollection("products");
    const productType = userType === 'Vendor' ? productsFetched : allProductsFetched



    const [foodID, setID] = useState('');
    
    const [ fields, setFields ] = useState(false);
    //const [ alertStatus, setAlertStatus ] = useState('danger');
    const [ msg, setMsg ] = useState(null);

    // console.log(name + " " + description + 
    // " " + price + " " + quantity);


    const deleteItem = async (data) => {
        await deleteDoc(doc(firestore, "products", data.id));
        
    };


    const delDetails = () => { 
        try {
            if( (!foodID ) ) {
                setFields(true);
                setMsg("Required fields can't be empty");
                //setAlertStatus('danger');

                setTimeout(() => {
                    setFields(false);
                }, 0) //4000 originally
            } else {
                const data = {
                    id : foodID,

                    //To add in user's email to identify and fetch data
                }
                deleteItem(data);

                setFields(true);
                setMsg('Deleted successfully');
                deleteDetails();
                //setAlertStatus('success');

                setTimeout(() => {
                    setFields(false);
                }, 1000); //4000 originally
            }


            } catch (error) {
                console.log(error);
                setFields(true);
                setMsg('Error while deleting : Try Again');
                //setAlertStatus('danger');

                setTimeout(() => {
                setFields(false);
                }, 4000)
            };
        };

    const deleteDetails = () => { 
        setID('');
     }

    return ( 
        <div className="row">
        <div className="addProduct">
    
        <h2>Delete Product</h2>
        <p>Enter Product ID to delete</p>

        { fields && ( 
                <h1 style={{color: "red"}} >{ msg }</h1>
        )}

        <form>

            <TextField 
                sx={{
                    width:'50ch',
                }}
                
                style={{fontSize: "15px", 
                marginBottom: "15px",
                textAlign: "center"}} 

                label="Food ID" 
                placeholder="Enter Food ID" 
                variant="outlined"
                required
                
                value={ foodID }
                onChange={(e) => setID(e.target.value)}

                />



            {/* <Paper />
            <Box /> */}
            
            {/* Button for Upload */}
            <div><Button sx={{width:'29ch'}} 
            style={
                {
                    // background: "#f1356d",
                    background: "#5297FF",
                    color: "#fff",
                    border: "0",
                    padding: "8px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginTop: "30px"
                }
            }
            type="submit"

            onClick={ delDetails }
            >Delete</Button>


            <Link to="/homeVendor">
            <Button sx={{width:'20ch'}} 
            style={
                {
                    // background: "#f1356d",
                    marginLeft: '0.8rem',
                    background: "#5297FF",
                    color: "#fff",
                    border: "0",
                    padding: "8px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginTop: "30px"
                }
            }
            type="submit"
            >Back</Button>
            </Link>
            </div>

        </form>

        

	</div>
        <aside className="block col-1">
            <h1>Your Listings:</h1>
            <Display products={productType}></Display>

        </aside>
    </div>
    
     );
}
 
export default DeleteProduct;