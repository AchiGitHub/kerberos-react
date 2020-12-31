// Actions
import { createAction } from 'redux-actions'
import types from './types'

export default {
  login: createAction(types.LOGIN),
  loginCancel: createAction(types.LOGIN_CLEAR),
  loginFieldChanged: createAction(types.LOGIN_FIELD_CHANGED,
    (k, v) => ({ k, v })
    /*{
      type: LOGIN_FIELD_CHANGED,
      payload: {k: "key", v: "val"}
    }*/
  ),
  loginSuccess: createAction(types.LOGIN_SUCCESS),
  loginFailed: createAction(types.LOGIN_FAILED),
  sessionStart: createAction(types.LOGIN_SESSION_START),
  sessionEnd: createAction(types.LOGIN_SESSION_END),

  loginWithSSO: createAction(types.LOGIN_WITH_SSO),
  loginWithSSOSuccess: createAction(types.LOGIN_WITH_SSO_SUCCESS),
  loginWithSSOFailed: createAction(types.LOGIN_WITH_SSO_FAILED),

  getUserToken: createAction(types.GET_USER_TOKEN),
  getUserTokenSuccess: createAction(types.GET_USER_TOKEN_SUCCESS),
  getUserTokenFailed: createAction(types.GET_USER_TOKEN_FAILED),

  headerToken: createAction(types.HEADER_TOKEN)
}

