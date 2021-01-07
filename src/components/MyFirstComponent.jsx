import React, {useState} from "react";
import ReactDom from "react-dom";
import ButtonComponent from "./ButtonComponent"
import "./Button.css";

function MyFirstComponent(props) {

    const [ countVal, increment ] = useState(0);

    function buttonFunc(event) {
        const { value } = event.target;
        increment((prevValue) => 
            parseInt(prevValue) + parseInt(value))
    }

    return (
        <div className="button-div">
            <ButtonComponent buttonFunc={buttonFunc} val={100} name={"100"}/>
            
            <ButtonComponent buttonFunc={buttonFunc} val={10} name={"10"}/>
            
            <ButtonComponent buttonFunc={buttonFunc} val={1} name={"1"}/>
            
            <ButtonComponent buttonFunc={buttonFunc} val={-100} name={"-100"}/>
            
            <ButtonComponent buttonFunc={buttonFunc} val={-10} name={"-10"}/>
            
            <ButtonComponent buttonFunc={buttonFunc} val={-1} name={"-1"}/>
            
            <h1>{ countVal }</h1>
        </div>
    );
}

export default MyFirstComponent;