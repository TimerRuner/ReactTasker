import React, { Component } from "react"
import Button from "../UI/Button"
import Input from "../UI/Input"
import Auxiliary from "../Hoc/Auxiliary"
import Select from "../UI/Select"
import { validate, validateForm, createControl } from "../../form/formFramework"
import axios from "../axios/axios-quiz"
import { connect } from "react-redux"
import { createQuizQuestion, finishCreateQuiz } from "../store/actions/create"

function createOptionControl(number) {
    return createControl(
        {
            label: `Варіант ${number}`,
            errorMessage: "Значення не може бути пустим",
            id: number,
        },
        { required: true }
    )
}

function createFormControls() {
    return {
        question: createControl(
            {
                label: "Введіть питання",
                errorMessage: "Питання не може бути пустим",
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {
    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    addQuestionHandler = (event) => {
        event.preventDefault()

        const { question, option1, option2, option3, option4 } =
            this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {
                    text: option1.value,
                    id: option1.id,
                },
                {
                    text: option2.value,
                    id: option2.id,
                },
                {
                    text: option3.value,
                    id: option3.id,
                },
                {
                    text: option4.value,
                    id: option4.id,
                },
            ],
        }

        this.props.createQuizQuestion(questionItem)

        //? чиститься форма при створені питання
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        })
    }

    createQuizHandler = (event) => {
        event.preventDefault()

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        })

        this.props.finishCreateQuiz()
    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls),
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map(
            (controlName, index) => {
                const control = this.state.formControls[controlName]

                return (
                    <Auxiliary key={controlName + index}>
                        <Input
                            label={control.label}
                            value={control.value}
                            valid={control.valid}
                            shoudValidate={!!control.validation}
                            touched={control.touched}
                            errorMessage={control.errorMessage}
                            onChange={(event) =>
                                this.changeHandler(
                                    event.target.value,
                                    controlName
                                )
                            }
                        />
                        {index === 0 ? <hr /> : null}
                    </Auxiliary>
                )
            }
        )
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value,
        })
    }

    render() {
        const select = (
            <Select
                label="Виберіть правильну відповідь"
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandler}
                options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 },
                ]}
            />
        )
        return (
            <div className="QuizCreator">
                <div>
                    <h1>Створення тесту</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        {select}
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавити питання
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Створити тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)