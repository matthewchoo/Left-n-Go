//import { Button } from 'bootstrap';
import MButton from './MButton';
import React, {useState} from 'react';
import Modal from './Modal';
import { firestore } from "../config/firebaseConfig";
import { deleteDoc, doc, runTransaction } from "firebase/firestore";
import { ModalBody, ModalFooter, ModalHeader } from './Modal';





export default function Basket(props) {
    const {cartItems, onAdd, onRemove, products} = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const taxPrice = itemsPrice * 0.17;
    const totalPrice = itemsPrice + taxPrice;
    const [showModal, setShowModal] = useState(false);

    const deleteItem = async (data) => {
        await deleteDoc(doc(firestore, "products", data.id));
        
    };

    function refreshPage() {
        window.location.reload(false);
      }

    function mapConfirm() {

        cartItems.map((item) => (
            rConfirm(item)
        ))

        refreshPage();
    }

    function rConfirm(data) {
        
        
        let nData = {
            id : data.id,
            name : data.name,
            description : data.description,
            imageURL : data.imageURL,
            quantity : data.quantity,
            price : data.price,
        }

        //console.log(exist.qty);
        const checkID = data.id;
        console.log(checkID);
        console.log(data.id);
        console.log(data.qty);
        products.map((x) =>
            x.id === checkID ? nData.quantity = x.quantity - data.qty : x 
        );
        console.log(nData);
        saveItem(nData);

        if (nData.quantity === 0) {
            deleteItem(nData);
        }


        
    }

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


    return <aside  className= "block col-1" >
        <h2>Cart Items</h2>
        <div>
            {cartItems.length === 0 && <div>Cart is Empty. Please add something!</div>}
            
        </div>
        
        


        {cartItems.map((item) => (
            <div key={item.id} className = "rowBasket">
                <div className="col-2 text-left">{item.name}</div>
                <div className="col-2">
                    <button onClick={ () => onAdd(item) } className="add" >
                    +
                    </button>

                    <button onClick={ () => onRemove(item) } className="remove">
                    -
                    </button>
                </div>

                <div className="col-2 text-right">
                    {item.qty} x ${item.price}
                </div>

            </div>
        ))}

        {cartItems.length !== 0 && (
            <>
                <hr></hr>

                <div className="rowBasket">
                    <div className="col-2 text-left">Items Price</div>
                    <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                </div>

                <div className="rowBasket">
                    <div className="col-2 text-left">Tax Price</div>
                    <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                </div>
                
                <hr></hr>

                <div className="rowBasket">
                    <div className="col-2 text-left"><strong>Total Price</strong></div>
                    <div className="col-1 text-right"><strong>${totalPrice.toFixed(2)}</strong></div>
                </div>

                <div>
                    <button className="block" onClick={() => setShowModal(true)}>
                        Checkout
                    </button>

                    <Modal show ={showModal} setShow={setShowModal}>
                        <ModalHeader>
                            <h2>Confirmation</h2>
                            <hr></hr>
                        </ModalHeader>
                        <ModalBody>
                            

                            {cartItems.map((item) => (
                            <div key={item.id} className = "rowBasket">
                            <div className="col-2 text-left"><img className="wrap" src={ item.imageURL } alt={item.name}></img> {item.name} : {item.qty} x ${item.price}</div>
                            </div>
                            ))}
                            
                            
                            <hr></hr>
                            <div>Total: <strong>${totalPrice.toFixed(2)}</strong></div>
                            
                        </ModalBody>

                        <ModalFooter>

                        
                            
                            <MButton onClick={() => {setShowModal(false) ; mapConfirm(); }} >
                                Confirm
                            </MButton>

                            <MButton onClick={() => setShowModal(false)}>
                                Close
                            </MButton>
                        
                        </ModalFooter>
                    </Modal>

                    

                </div>

                
            </>

        )}

    </aside>;
}