import { combineReducers } from "redux"
import quizReducer from "./quiz.js"
import createReducer from "./create.js"
import authReducer from "./auth.js"

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer,
})
