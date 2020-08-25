import {FETCH_QUZES_ERROR, FETCH_QUZES_START, FETCH_QUZES_SUCCESS} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUZES_START: return {
            ...state, loading: true
        }
        case FETCH_QUZES_SUCCESS: return {
            ...state, loading: false, quizes: action.quizes
        }
        case FETCH_QUZES_ERROR: return {
            ...state, loading: false, error: action.error
        }
        default:
            return state
    }
}