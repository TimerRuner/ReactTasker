import {
    FETCH_QUIZ_ERROR,
    FETCH_QUIZ_START,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE,
} from "../actions/acrionType.js"

export default function quizItemReducer(state, action) {
    switch (action.type) {
        case FETCH_QUIZ_START:
            return {
                ...state,
                loading: true,
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.payload,
            }
        case FETCH_QUIZ_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results,
            }
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true,
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerState: null,
                activeQuestion: action.number,
            }
        case QUIZ_RETRY:
            return {
                ...state,
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {},
            }
        default:
            throw new Error()
    }
}
