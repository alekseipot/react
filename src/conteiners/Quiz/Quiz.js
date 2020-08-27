import React, {Component} from 'react';
import './Quiz.css';
import ActiveQuiz from "../../components/QctiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from 'react-redux';
import {fetchQuizById, fetchQuizes, quizAnswerClick} from "../../store/actions/quiz";

class Quiz extends Component {

    retryHandler = () => {
        this.setState({
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            }
        )
    }

    async componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    render() {
        return (
            <div className='Quiz'>
                <div className='QuizWrapper'>
                    <h1>Answer all questions</h1>
                    {this.props.loading || !this.props.quiz
                        ? <Loader/>
                        :
                        this.props.isFinished ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.retryHandler}
                            />
                            :
                            <ActiveQuiz
                                question={this.props.quiz[this.props.activeQuestion].question}
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                questionNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />}

                </div>
            </div>
        );
    }
}

function mapSateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId))

    }
}

export default connect(mapSateToProps, mapDispatchToProps)(Quiz)