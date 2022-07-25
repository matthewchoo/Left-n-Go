import { InputLabel, Button, TextField, NativeSelect, Grid } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";
import { useState } from "react";
import Display from "../components/Display";

import { Link } from 'react-router-dom';
import { doc, runTransaction } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable  } from "firebase/storage";
import { storage, firestore } from "../config/firebaseConfig";
import { useCollection } from "../hooks/useCollection";
import { useAuth } from "../hooks/useAuth";



const UpdateProduct = (props) => {

    

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ quantity, setQuantity ] = useState(1);
    const [ foodID, setID ] = useState('');
    
    const [ imageAsset, setImageAsset ] = useState(null);
    const [ imageName, setImageName ] = useState('');

    const [ fields, setFields ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false)
    const [ msg, setMsg ] = useState(null);

    const { user, userType } = useAuth();

    const q = ["vendorMail", "==", user.email];

    const { documents: productsFetched } = useCollection("products", q);
    const { documents: allProductsFetched } = useCollection("products");
    const productType = userType === 'Vendor' ? productsFetched : allProductsFetched
    
    // console.log(name + " " + description + 
    // " " + price + " " + quantity);

    const saveItem = async (data) => {
        const sfDocRef = doc(firestore, "products", data.id);

        try {
            await runTransaction(firestore, async (transaction ) => {
                const sfDoc = await transaction.get(sfDocRef);
                if (!sfDoc.exists()) {
                    throw new Error("ID does not exist!");
                }
                
                transaction.update(sfDocRef, { description: data.description, name: data.name,
                imageURL : data.imageURL, quantity: data.quantity, price: data.price});
            });
            // console.log("Transaction committed successfully.");
        } catch (e) {
            console.log("Transaction failed: ", e);     
        }

        
    };

    const uploadImage = (e) => { 
        setIsLoading(true)
        const imageFile = e.target.files[0]; //Only single image
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`); //Image Name
        setImageName(imageFile.name);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed', (snapshot) => {
            //const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; //Can enable this line to show progess bar
        }, (error) => {
            console.log(error);
            setFields(true);
            setMsg('Error while uploading : Try Again');
            setIsLoading(false)

            setTimeout(() => {
                setFields(false);
            }, 4000);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                setImageAsset(downloadURL);
                setFields(true);
                setMsg('Image uploaded successfully');
                
                setIsLoading(false)
                setTimeout(() => {
                    setFields(false);
                }, 4000); //Originally 2000
            })
        });
     };

    const deleteImage = () => {
        setIsLoading(true)

        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setImageName('');
            setFields(true);
            setMsg('Image deleted successfully');
                setIsLoading(false)


                setTimeout(() => {
                    setFields(false);
                }, 4000);
        });
    };
    
    const saveDetails = (e) => { 
        e.preventDefault()

        try {
            if( (!foodID || !name || !description || !quantity || !price || !imageAsset ) ) {
                setFields(true);
                setMsg("Required fields can't be empty");
                //setAlertStatus('danger');

                setTimeout(() => {
                    setFields(false);
                }, 4000) //4000 originally
            } else if (price <= 0) {
                setFields(true)
                setMsg("Please enter a valid price!")

                setTimeout(() => {
                    setFields(false);
                }, 4000) //4000 originally

            } else {
                const data = {
                    id : foodID,
                    name : name,
                    description : description,
                    imageURL : imageAsset,
                    quantity : quantity,
                    price : price,

                    //To add in user's email to identify and fetch data
                }
                saveItem(data);

                setFields(true);
                setMsg('Data uploaded successfully');
                deleteDetails();
                

                setTimeout(() => {
                    setFields(false);
                }, 4000); //4000 originally
            }


            } catch (error) {
                console.log(error);
                setFields(true);
                setMsg('Error while uploading : Try Again');

                setTimeout(() => {
                setFields(false);
                }, 4000)
            };
        };

    const deleteDetails = () => { 
        setID('');
        setName('');
        setImageAsset(null);
        setDescription('');
        setPrice('');
        setQuantity(1);
     }

    return ( 
        <div className="row">
        <div className="addProduct">
    
        <h2>Update Product</h2>
        <p>Fill in your updated product details</p>

        { fields && ( 
                <h1 style={{color: "red"}} >{ msg }</h1>
        )}

        { isLoading && ( 
                // <h1 style={{color: "red"}} >Uploading image...</h1>
                <h1 style={{color: "red"}} >Loading...</h1>
        )}

        <form>

            <TextField 
                sx={{
                    width:'50ch',
                }}
                
                style={{fontSize: "15px", 
                marginBottom: "15px",
                textAlign: "center"}} 

                label="Product ID" 
                placeholder="Enter Product ID" 
                variant="outlined"
                required
                
                value={ foodID }
                onChange={(e) => setID(e.target.value)}

                />

            {/* For Name of product */}
            <TextField 
                sx={{
                    width:'50ch',
                }}
                
                style={{fontSize: "15px", 
                marginBottom: "15px",
                textAlign: "center"}} 

                label="New Food Title" 
                placeholder="Enter New Food Title" 
                variant="outlined"
                required
                
                value={ name }
                onChange={(e) => setName(e.target.value)}

                />

            {/* Description */}
            <TextField 
                sx={{width:'50ch'}}
                
                style={{fontSize: "15px", 
                marginBottom: "15px",
                textAlign: "center"}} 

                label="New Food Description" 
                placeholder="Enter Food Description" 
                variant="outlined"
                required
                multiline
                rows={3}

                value={ description }
                onChange={(e) => setDescription(e.target.value)}
                />

            {/* For Qty and Price */}
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{width:'15ch'}}>
                        New Qty
                    </InputLabel>
                    <NativeSelect
                        inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}
                        sx={{width:'15ch'}}
                        value={ quantity }

                        onChange={(e) => setQuantity(e.target.value)}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </NativeSelect>
                </Grid>

                <Grid 
                    item xs={9} 
                    style={{ 
                        fontSize: "40",
                        flex : "none",
                        marginLeft : "15px",
                        }}
                 >
                    <AttachMoney 
                        style={{ 
                            fontSize: "40",
                            marginTop : "10px",
                            }} 
                    />
                    <TextField 
                    sx={{width:'28.7ch'}}
                    
                    style={{fontSize: "15px", 
                    marginBottom: "15px",
                    textAlign: "center"}} 

                    label="New Price"
                    placeholder="Enter Food Price" 
                    variant="outlined"
                    required
                    rows={3}

                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </Grid>

            </Grid>

            {/* For Upload Photo */}

            <div style={{flex : "flex-col"}}>
                <h3>Upload Photos : </h3>
                
                <>{
                    imageAsset ? <>
                        <p  style={{fontSize: "15px", 
                            textAlign: "left"}}> 
                            { imageName } 
                        </p>

                        <button type="button" onClick={ deleteImage }> Delete Image </button>
                    </> : <> 
                    <label htmlFor='upload-photo'>
                        <input
                            style={{ marginTop: "10px" }}
                            id='upload-photo'
                            name='upload-photo'
                            type='file'
                            required

                            accept="image/*"

                            onChange={ uploadImage }
                        />
                        </label>
                    </>
                }</>

            </div>
            
            {/* Button for Upload */}
            <div><Button sx={{
                width:'29ch',
                ':hover' : {
                    bgcolor: "#555",
                }
            }} 
            className={ isLoading ? "disabled-btn" : "submit-btn" }
            type="submit"
            disabled={isLoading}

            onClick={ saveDetails }
            >Upload</Button>
            
            <Link to="/home">
                <Button sx={{
                    width:'20ch',
                    ':hover' : {
                        bgcolor: "#555",
                    }
                }} 
                
                className='back-btn'
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
 
export default UpdateProduct;