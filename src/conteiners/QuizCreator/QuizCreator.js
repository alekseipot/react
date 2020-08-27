import React, {Component} from "react";
import './QuizCreator.css';
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFrameWork";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

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

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = event => {
        event.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler = event => {
        event.preventDefault();
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
        this.props.finishCreateQuiz();
        // axios.post('https://react-quiz-f934d.firebaseio.com/quizes.json', this.state.quiz)
        //     .then(response =>
        //         console.log(response))
        //     .catch(error =>
        //         console.log(error));
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls: formControls,
            isFormValid: validateForm(formControls)
        })
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
                        {index === 0 && <hr/>}
                    </React.Fragment>
                )
            }
        );
    }

    selectChangeHandler = event => {
        this.setState({rightAnswerId: +event.target.value});
    }

    render() {
        const select = <Select
            label='Chose right answer'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />;
        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Quiz Creator</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        {select}
                        <Button
                            type="primary"
                            disabled={!this.state.isFormValid}
                            onClick={this.addQuestionHandler}
                        >Add question</Button>
                        <Button
                            type="success"
                            disabled={this.props.quiz.length === 0}
                            onClick={this.createQuizHandler}
                        >Create quiz</Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapSateToProps(state) {
    return {
        quiz: state.create.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    }
}

export default connect(mapSateToProps, mapDispatchToProps)(QuizCreator)