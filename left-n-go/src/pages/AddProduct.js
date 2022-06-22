import { InputLabel, Button, TextField, NativeSelect, Grid } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";
import { useState } from "react";


import { deleteObject, getDownloadURL, ref, uploadBytesResumable  } from "firebase/storage";
import { storage, saveItem } from "../config/firebaseConfig";


const AddProduct = () => {

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    
    const [ imageAsset, setImageAsset ] = useState(null);
    const [ imageName, setImageName ] = useState('');

    const [ fields, setFields ] = useState(false);
    //const [ alertStatus, setAlertStatus ] = useState('danger');
    const [ msg, setMsg ] = useState(null);

    // console.log(name + " " + description + 
    // " " + price + " " + quantity);

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
                }, 2000);
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
            if( (!name || !description || !quantity || !price || !imageAsset ) ) {
                setFields(true);
                setMsg("Required fields can't be empty");
                //setAlertStatus('danger');

                setTimeout(() => {
                    setFields(false);
                }, 4000)
            } else {
                const data = {
                    id : `${Date.now()}`,
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
                }, 4000);
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
        setName('');
        setImageAsset(null);
        setDescription('');
        setPrice('');
        setQuantity(1);
     }

    return ( 
        <div className="addProduct">
    
        <h2>Add Product</h2>
        <p>Fill in your product details</p>

        { fields && ( 
                <h1 style={{color: "red"}} >{ msg }</h1>
        )}

        <form>
            {/* For Name of product */}
            <TextField 
                sx={{
                    width:'50ch',
                }}
                
                style={{fontSize: "15px", 
                marginBottom: "15px",
                textAlign: "center"}} 

                label="Food Title" 
                placeholder="Enter Food Title" 
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

                label="Food Description" 
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
                        Qty
                    </InputLabel>
                    <NativeSelect
                        defaultValue={" "}
                        inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}
                        sx={{width:'15ch'}}

                        onChange={(e) => setQuantity(e.target.value)}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
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

                    label="Price" 
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
     );
}
 
export default AddProduct;