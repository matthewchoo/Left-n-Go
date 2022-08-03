import { InputLabel, Button, TextField } from "@mui/material"
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react"
import { firestore } from "../config/firebaseConfig";
// import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

export default function UpdateAddr({ addr }) {
    const { user } = useAuth();

    const updateAddr = (newAddr) => {
        updateDoc(doc(firestore, "users", user.uid), { 
          addr : newAddr 
        }).then(() => {

            setWarning("Successfully updated address")
            setIsLoading(false)

            clearData()
        })
        .catch((err) => {
            setWarning(err.message)
        });
    };

    const [ newAddr, setNewAddr ] = useState(addr)
    // const [ confirmAddr, setConfirmAddr ] = useState('')
    const [ warning, setWarning ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        updateAddr(newAddr)
    }

    const clearData = () => {
        setNewAddr('')

        setTimeout(() => {
            setWarning("");
        }, 4000)
    }

  return (
    <form>

        {/* { error && <h3 style={{color: "red"}}>{ error }</h3>} */}
        { warning && <h3 style={{color: "red"}}>{ warning }</h3> }

        <InputLabel htmlFor="address" style={{fontSize: "15px", marginBottom: '10px', marginTop: '10px'}}>
            <span>Enter new Address: </span>
                <TextField sx={{width:'20ch'}}
                id="outlined-multiline-static"
                
                value={newAddr} 
                onChange={(e) => setNewAddr(e.target.value)}
                ></TextField>                   
        </InputLabel>

        <div style={{width: '100%', display:"flex", justifyContent:'center'}}>
            <Button 
                    size="large" 
                    variant="outlined"
                    style={{marginBottom: '20px', marginTop:'20px'}}
                    sx={{
                        width:'25ch',
                    }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                    >Submit</Button>
        </div>
    </form>
  )
}
