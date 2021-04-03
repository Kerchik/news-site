const CHANGE_IS_LOGGED_IN = "CHANGE_IS_LOGGED_IN"

const initialState = {
    loggedIn: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_IS_LOGGED_IN: {
            return {...state, loggedIn: action.loggedIn}
        }
        default:
            return state
    }
}

export const changeIsLoggedIn = (loggedIn) => ({type: CHANGE_IS_LOGGED_IN, loggedIn})

export default authReducer;