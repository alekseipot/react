import React, {Component} from 'react';
import './Quiz.css';
import ActiveQuiz from "../../components/QctiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {

    state = {
        results: {}, //{[id]: 'success', 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null,//{[id]: 'success', 'error'}
        quiz: [
            {
                id: 1,
                question: 'What is color of sky?',
                rightAnswerId: 4,
                answers: [
                    {text: 'Black', id: 1},
                    {text: 'Red', id: 2},
                    {text: 'Green', id: 3},
                    {text: 'Blue', id: 4}
                ]
            },
            {
                id: 2,
                question: 'What year St Piter was build?',
                rightAnswerId: 3,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1705', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })

            const timout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timout);
            }, 1000)

        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            }
        )
    }

    render() {
        return (
            <div className='Quiz'>
                <div className='QuizWrapper'>
                    <h1>Answer all questions</h1>
                    {this.state.isFinished ?
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        :
                        <ActiveQuiz
                            question={this.state.quiz[this.state.activeQuestion].question}
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            questionNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz