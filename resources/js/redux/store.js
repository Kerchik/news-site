import {createStore, combineReducers, applyMiddleware} from "redux"
import authReducer from "./authReducer"

const reducers = combineReducers({
    auth: authReducer,
})

const store = createStore(reducers)
export default store;