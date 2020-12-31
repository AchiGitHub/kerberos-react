// Reducers: combine all reducers of the app
import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import login from './modules/login/ducks'

export default combineReducers({
    Login: login,
    ReduxForm: reduxFormReducer
})
