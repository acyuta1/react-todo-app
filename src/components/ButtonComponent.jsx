import React, {useState} from "react";
import ReactDom from "react-dom";

function ButtonComponent(props) {

    return (
        <button 
            className="button"
            onClick={props.buttonFunc}
            value= {props.val}
        >{props.name}</button>
    );
}

export default ButtonComponent;