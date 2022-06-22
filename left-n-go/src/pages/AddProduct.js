import { InputLabel, Button, TextField, NativeSelect, Grid } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";
import { useState } from "react";


const AddProduct = () => {

    // const [ name, setName ] = useState('');
    // const [ description, setDescription ] = useState('');
    // const [ price, setPrice ] = useState('');
    // const [ quantity, setQuantity ] = useState('');
    
    // const [ imageAsset, setImageAsset ] = useState(null);

    const [ fields, setFields ] = useState(true);
    // const [ alertStatus, setAlertStatus ] = useState('danger');
    // const [ msg, setMsg ] = useState(null);


    return ( 
        <div className="addProduct">
    
        <h2>Add Product</h2>
        <p>Fill in your product details</p>

        { fields && ( 
                <h1 style={{color: "red"}}>Alert Message </h1>
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
                    />
                </Grid>

            </Grid>

            {/* For Upload Photo */}

            <div style={{flex : "flex-col"}}>
                <h3>Upload Photos : </h3>
                <label htmlFor='upload-photo'>
                <input
                    style={{ marginTop: "10px" }}
                    id='upload-photo'
                    name='upload-photo'
                    type='file'
                    required
                />
                </label>
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
            >Upload</Button></div>

        </form>

	</div>
     );
}
 
export default AddProduct;