// Selectors
import { createSelector, createStructuredSelector } from 'reselect'

const loggedInSelector = state => state.Login.loggedin
const authenticatedSelector = state => state.Login.isAuthenticated
const usernameSelector = state => state.Login.username
const roleSelector = state => state.Login.role
const errorSelector = state => state.Login.hasError
const errorContentSelector = state => state.Login.error

export default {
    getAuthenticated: createStructuredSelector({
        isLoggedIn: loggedInSelector,
        isAuthenticated: authenticatedSelector
    }),
    getUsername: createSelector(usernameSelector, (value) => value),
    getRole: createSelector(roleSelector, (value) => value),
    getError: createStructuredSelector({
        hasError: errorSelector,
        error: errorContentSelector
    })
}