import React, {Component} from "react";
import Button from '../../components/UI/Button/Button'
import './Auth.css';
import Input from "../../components/UI/Input/Input";
import is from 'is_js';

export default class Auth extends Component {


    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Provide valid email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Provide valid password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = event => {
        event.preventDefault();
    }

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }
        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.email) {
            isValid = is.email(String(value).toLowerCase()) && isValid;
        }
        if (validation.minLength) {
            isValid = value.trim().length >= validation.minLength && isValid;
        }
        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = isFormValid && formControls[name].valid;
        });

        this.setState(
            {
                formControls: formControls,
                isFormValid: isFormValid
            }
        )
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map(
            (controlName, index) => {
                const control = this.state.formControls[controlName];
                return (
                    <Input
                        key={controlName + index}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={event => this.onChangeHandler(event, controlName)}
                    />
                );
            }
        );
    }

    render() {
        return (
            <div className='Auth'>
                <div>
                    <h1>Authorisation</h1>

                    <form onSubmit={this.submitHandler} className='AuthForm'>
                        {this.renderInputs()}
                        <Button type="success"
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}>
                            Login
                        </Button>
                        <Button type="primary"
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}>
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}