import React, {Component} from "react";
import './QuizCreator.css';
import Button from "../../components/UI/Button/Button";
import {createControl} from "../../form/formFrameWork";
import Input from "../../components/UI/Input/Input";

function createOptionControl(number) {
    return createControl({
        label: `Option ${number}`,
        id: number,
        error: 'Value can not be empty'
    }, {
        required: true
    });
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Input question',
            error: 'Question can not be empty'
        }, {
            required: true
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }

    changeHandler = (value, controlName) => {

    }


    renderInputs() {
        return Object.keys(this.state.formControls).map(
            (controlName, index) => {
                const control = this.state.formControls[controlName];
                return (
                    <React.Fragment key={controlName + index}>
                        <Input
                            label={control.label}
                            value={control.value}
                            valid={control.valid}
                            shouldValidate={!!control.validation}
                            touched={control.touched}
                            errorMeassage={control.errorMeassage}
                            onChange={event => this.changeHandler(event.target.value, controlName)}
                        />
                        {index == 0 && <hr/>}
                    </React.Fragment>
                )
            }
        );
    }

    render() {
        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Quiz Creator</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        <select></select>
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                        >Add question</Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                        >Create quiz</Button>
                    </form>
                </div>
            </div>
        )
    }
}