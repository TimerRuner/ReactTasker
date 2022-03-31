import React, { Component } from "react"
import Button from "../UI/Button"
import Input from "../UI/Input"
import { connect } from "react-redux"
import { auth } from "../store/actions/auth"

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: "",
                type: "email",
                label: "Email",
                errorMessage: "Введіть коректний email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                },
            },
            password: {
                value: "",
                type: "password",
                label: "Password",
                errorMessage: "Введіть коректний password",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                },
            },
        },
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    submitHandler = (e) => {
        e.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== "" && isValid
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (e, controlName) => {
        const formControls = { ...this.state.formControls } //? щоб не мутувати поточний стейт
        const control = { ...formControls[controlName] } //? щоб не мутувати поточний стейт

        control.value = e.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            isFormValid,
            formControls,
        })
    }

    renderInput() {
        return Object.keys(this.state.formControls).map(
            (controlName, index) => {
                const control = this.state.formControls[controlName]

                return (
                    <Input
                        key={controlName + index}
                        type={control.type}
                        value={control.value}
                        touched={control.touched}
                        valid={control.valid}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={(event) =>
                            this.onChangeHandler(event, controlName)
                        }
                    />
                )
            }
        )
    }

    render() {
        return (
            <div className="Auth">
                <div>
                    <h1>Авторизація</h1>
                    <form onSubmit={this.submitHandler} className="AuthForm">
                        {this.renderInput()}

                        <Button
                            disabled={!this.state.isFormValid}
                            type="success"
                            onClick={this.loginHandler}
                        >
                            Увійти
                        </Button>
                        <Button
                            disabled={!this.state.isFormValid}
                            type="primary"
                            onClick={this.registerHandler}
                        >
                            Зареєструватись
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, islogin) =>
            dispatch(auth(email, password, islogin)),
    }
}

export default connect(null, mapDispatchToProps)(Auth)
