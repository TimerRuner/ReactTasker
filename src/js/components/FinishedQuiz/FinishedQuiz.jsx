import React from "react"
import Button from "../../UI/Button"
import { Link } from "react-router-dom"

const FinishedQuiz = (props) => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === "success") {
            total++
        }
        return total
    }, 0)

    return (
        <div className="FinishedQuiz">
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        "fa",
                        props.results[quizItem.id] === "error"
                            ? "fa-times"
                            : "fa-check",
                        props.results[quizItem.id],
                    ]
                    return (
                        <li key={index}>
                            <strong>{index + 1}. </strong>&nbsp;{" "}
                            {quizItem.question}
                            <i className={cls.join(" ")} />
                        </li>
                    )
                })}
            </ul>

            <p>
                Правильно {successCount} із {props.quiz.length}
            </p>

            <div>
                <Button onClick={props.onRetry} type="primary">
                    Повторити
                </Button>
                <Link to="/">
                    <Button onClick={props.onRetry} type="success">
                        Перейти в список тестів
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz
