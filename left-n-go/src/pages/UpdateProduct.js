import { InputLabel, Button, TextField, NativeSelect, Grid } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";
import { useState } from "react";
import Display from "../components/Display";


import { doc, runTransaction } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable  } from "firebase/storage";
import { storage, firestore } from "../config/firebaseConfig";


const UpdateProduct = (props) => {

    const products = props.products;

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    const [foodID, setID] = useState('');
    
    const [ imageAsset, setImageAsset ] = useState(null);
    const [ imageName, setImageName ] = useState('');

    const [ fields, setFields ] = useState(false);
    //const [ alertStatus, setAlertStatus ] = useState('danger');
    const [ msg, setMsg ] = useState(null);

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
            console.log("Transaction successfully committed!");
        } catch (e) {
            console.log("Transaction failed: ", e);
        }

        
    };
/*
    const saveItem = async (data) => {
        

        firestore.collection("Products").doc(data.foodID).set({
            description: data.description,
            name: data.name,
            imageURL : data.imageURL, 
            quantity: data.quantity, 
            price: data.price
        }).then(() => {
            console.log("Document updated succesfully");
        }).catch((err) => {
            console.log("Error : " + err.message);
        });
    }
*/
    const uploadImage = (e) => { 
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
            //setAlertStatus('danger');

            setTimeout(() => {
                setFields(false);
            }, 4000);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                setImageAsset(downloadURL);
                setFields(true);
                setMsg('Image uploaded successfully');
                //setAlertStatus('success')

                setTimeout(() => {
                    setFields(false);
                }, 0); //Originally 2000
            })
        });
     };

    const deleteImage = () => {

        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setImageName('');
            setFields(true);
            setMsg('Image deleted successfully');
                //setAlertStatus('success');

                setTimeout(() => {
                    setFields(false);
                }, 4000);
        });
    };
    
    const saveDetails = () => { 
        try {
            if( (!foodID || !name || !description || !quantity || !price || !imageAsset ) ) {
                setFields(true);
                setMsg("Required fields can't be empty");
                //setAlertStatus('danger');

                setTimeout(() => {
                    setFields(false);
                }, 0) //4000 originally
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
                //setAlertStatus('success');

                setTimeout(() => {
                    setFields(false);
                }, 1000); //4000 originally
            }


            } catch (error) {
                console.log(error);
                setFields(true);
                setMsg('Error while uploading : Try Again');
                //setAlertStatus('danger');

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
                        defaultValue={" "}
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

            onClick={ saveDetails }
            >Upload</Button></div>

        </form>

        

	</div>
        <aside className="block col-1">
            <h1>Your Listings:</h1>
            <Display products={products}></Display>

        </aside>
    </div>
    
     );
}
 
export default UpdateProduct;