import {
    FETCH_QUIZ_ERROR,
    FETCH_QUIZ_START,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE,
} from "./acrionType.js"

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        payload: quiz,
    }
}

export function fetchQuizStart() {
    return {
        type: FETCH_QUIZ_START,
    }
}

export function fetchQuizError(error) {
    return {
        type: FETCH_QUIZ_ERROR,
        error,
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results,
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ,
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number,
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY,
    }
}
