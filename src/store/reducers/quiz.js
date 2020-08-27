import {
    FETCH_QUZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {}, //{[id]: 'success', 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null,//{[id]: 'success', 'error'}
    quiz: null,
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START: return {
            ...state, loading: true
        }
        case FETCH_QUIZES_SUCCESS: return {
            ...state, loading: false, quizes: action.quizes
        }
        case FETCH_QUIZ_SUCCESS: return {
            ...state, loading: false, quiz: action.quiz
        }
        case FETCH_QUZES_ERROR: return {
            ...state, loading: false, error: action.error
        }
        case QUIZ_SET_STATE: return {
            ...state, answerState: action.answerState, results: action.result
        }
        case FINISH_QUIZ: return {
            ...state, isFinished: true
        }
        case QUIZ_NEXT_QUESTION: return {
            ...state, answerState: null, activeQuestion: action.questionNumber
        }
        default:
            return state
    }
}