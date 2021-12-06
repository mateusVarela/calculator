import React from "react";
import './Buttons.css'

const button = props => {
    const classOperation = props.operation ? 'operation' : ''
    const classDouble = props.double ? 'double' : ''
    const classTriple = props.triple ? 'triple' : ''
    return(       
        <button 
        onClick={() => props.label && props.click(props.label)}
        className={`button ${classOperation} ${classDouble} ${classTriple}`}>
            {props.label}
        </button>
    )
}

export default button