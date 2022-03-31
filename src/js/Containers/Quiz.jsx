import React, { useState, useEffect, useReducer } from "react"
import ActiveQuiz from "../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../components/FinishedQuiz/FinishedQuiz"
import axios from "../axios/axios-quiz"
import Loader from "../UI/Loader"
import { useParams } from "react-router-dom"
import quizItemReducer from "../store/reducers/quizItem"
import {
    fetchQuizError,
    fetchQuizStart,
    fetchQuizSuccess,
    retryQuiz,
} from "../store/actions/quizItem.js"
import {
    quizSetState,
    finishQuiz,
    quizNextQuestion,
} from "../store/actions/quizItem.js"

function Quiz(props) {
    const initialState = {
        results: {}, //! {[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //! { [id]: 'success' 'error' }
        quiz: null,
        loading: false,
        error: null,
    }

    const [state, dispatch] = useReducer(quizItemReducer, initialState)

    let { id } = useParams()

    useEffect(async () => {
        dispatch(fetchQuizStart())
        try {
            const response = await axios.get(`/quizes/${id}.json`)

            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))
        } catch (error) {
            dispatch(fetchQuizError(error))
        }
        return () => {
            retryHandler()
        }
    }, [])

    function onAnswerClickHandler(answerId) {
        if (state.answerState) {
            //? Якщо ми уже відповіли правильно і чекаємо на зміну питання, повторно клікати неможливо

            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === "success") {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = "success"
            }
            dispatch(quizSetState({ [answerId]: "success" }, results))

            const timeout = window.setTimeout(() => {
                if (isQuizFinished()) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = "error"
            dispatch(quizSetState({ [answerId]: "error" }, results))
        }
    }

    function isQuizFinished() {
        return state.activeQuestion + 1 === state.quiz.length
    }

    function retryHandler() {
        dispatch(retryQuiz())
    }

    return (
        <div className="Quiz">
            <div className="Quiz__wrapper">
                <h1>Дайте відповіді напитання </h1>
                {state.loading || !state.quiz ? (
                    <Loader />
                ) : state.isFinished ? (
                    <FinishedQuiz
                        results={state.results}
                        quiz={state.quiz}
                        onRetry={retryHandler}
                    />
                ) : (
                    <ActiveQuiz
                        answers={state.quiz[state.activeQuestion].answers}
                        question={state.quiz[state.activeQuestion].question}
                        onAnswerClick={onAnswerClickHandler}
                        quizLength={state.quiz.length}
                        answerNumber={state.activeQuestion + 1}
                        state={state.answerState}
                    />
                )}
            </div>
        </div>
    )
}

export default Quiz
