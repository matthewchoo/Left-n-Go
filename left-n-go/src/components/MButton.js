import React from 'react'

export default function mButton(props) {
  return (
    <button className ='mButton' onClick={props.onClick}>
        {props.children}
    </button>
  )
}
