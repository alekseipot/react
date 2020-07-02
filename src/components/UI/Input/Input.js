import React from "react";
import './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}
const Input = props => {
    const inputType = props.type || 'text';
    const cls = ['Input'];
    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push('invalid');
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                value={props.value}
                type={inputType}
                onChange={props.onChange}/>
            {isInvalid(props) && <span>{props.errorMessage || 'Provide correct data' }</span>}
        </div>
    )
}

export default Input;