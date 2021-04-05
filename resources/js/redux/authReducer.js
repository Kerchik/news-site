const CHANGE_IS_LOGGED_IN = "CHANGE_IS_LOGGED_IN"
const CHANGE_LOGGED_USER = "CHANGE_LOGGED_USER"

const initialState = {
    loggedIn: false,
    user: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_IS_LOGGED_IN: {
            return {...state, loggedIn: action.loggedIn}
        }
        case CHANGE_LOGGED_USER: {
            return {...state, user: action.user}
        }
        default:
            return state
    }
}

export const changeIsLoggedIn = (loggedIn) => ({type: CHANGE_IS_LOGGED_IN, loggedIn})

export const changeLoggedUser = (user) => ({type: CHANGE_LOGGED_USER, user})

export default authReducer;