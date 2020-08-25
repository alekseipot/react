import axios from '../../axios/axios-quiz'
import {FETCH_QUZES_ERROR, FETCH_QUZES_START, FETCH_QUZES_SUCCESS} from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('https://react-quiz-f934d.firebaseio.com/quizes.json');
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({id: key, name: `Quiz #${index + 1}`})
            })
            console.log('action', quizes)
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUZES_SUCCESS,
        quizes: quizes
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUZES_START
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUZES_ERROR,
        error: e
    }
}