import React, { Component } from "react"
import Layout from "./Hoc/Layout"
import Quiz from "./Containers/Quiz"
import { Routes, Route } from "react-router-dom"
import QuizList from "./Containers/QuizList"
import Auth from "./Containers/Auth"
import QuizCreator from "./Containers/QuizCreater"
import { connect } from "react-redux"
import Logout from "./components/Logout/Logout"
import { autoLogin } from "./store/actions/auth"

class App extends Component {
    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let router = (
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/quiz/:id" element={<Quiz />} />
                <Route path="/" exact element={<QuizList />} />
                <Route path="*" element={<QuizList />} />
            </Routes>
        )
        if (this.props.isAuthenticated) {
            router = (
                <Routes>
                    <Route path="/quiz-creator" element={<QuizCreator />} />
                    <Route path="/quiz/:id" element={<Quiz />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" exact element={<QuizList />} />
                    <Route path="*" element={<QuizList />} />
                </Routes>
            )
        }
        return <Layout>{router}</Layout>
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
