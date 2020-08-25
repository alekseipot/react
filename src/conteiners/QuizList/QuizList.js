import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import './QuizList.css';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from '../../store/actions/quiz'
class QuizList extends Component {

    renderQuizes() {
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    };

    async componentDidMount() {
        this.props.fetchQuizes();
    }

    render() {
        return (
            <div className='QuizList'>
                <div>
                    <h1>Quiz List</h1>
                    {this.props.loading && this.props.quizes.length !== 0
                        ? <Loader/>
                        :
                        <ul>
                            {this.renderQuizes()}
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapSateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapSateToProps, mapDispatchToProps)(QuizList)