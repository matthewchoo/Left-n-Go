
import React from 'react'

const Modal = props => {
    const isIt = props.show ? 'active' : 'modal'
    return <div className = {isIt}>
        <div className= {isIt + "-content"} >
            <span onClick={()=>props.setShow(false)} className="modal-close">
                &times;
            </span>
            {props.children}
        </div>
    </div>
}

export default Modal

export const ModalHeader = props => {
    return <div className = "modal-header">
        {props.children}
    </div>

}

export const ModalBody = props => {
    return <div className = "modal-body">
        {props.children}
    </div>

}

export const ModalFooter = props => {
    return <div className = "modal-footer">
        {props.children}
    </div>

}

