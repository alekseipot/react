import React from "react";
import './FinishedQuiz.css'
import Button from "../UI/Button/Button";
import {Link} from 'react-router-dom';

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++;
        }
        return total;
    }, 0);
    return (
        <div className='FinishedQuiz'>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id],
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check'
                    ];
                    return (
                        <li key={index}>
                            <strong>{index + 1}. </strong>
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>)
                })

                }
            </ul>
            <p>Right {successCount} of {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type='primary'>Repeat</Button>
                <Link to='/'>
                    <Button type='success' >Go to quiz list</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz