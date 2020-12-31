import reducer from '../reducers'
import types from '../types'

const initialState = {
	username: '',
	hasError: false,
	error: {},
	resp: { status: 0, message: "" },
	loading: false,
	loggedin: false,

	isAuthenticated: !!localStorage.jwt,
	jwt: localStorage.jwt,
	user: localStorage.user
}

describe('Login >> reducer', () => {

	it('should have initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('should change fileds', () => {
		const action = {
			type: types.LOGIN_FIELD_CHANGED,
			payload: { k: "username", v: "test" }
		}
		const expectedState = { ...initialState, username: "test" }

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should clear login', () => {
		const action = {
			type: types.LOGIN_CLEAR
		}
		const expectedState = { ...initialState, username: "", hasError: false, resp: {}, loggedin: false }

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should start session', () => {
		const action = {
			type: types.LOGIN_SESSION_START
		}
		const expectedState = { ...initialState, isAuthenticated: true, jwt: "123", user: {"name":"test"}  }
		window.localStorage.setItem("jwt", "123")
		window.localStorage.setItem("user", JSON.stringify({"name":"test"}))
		expect(reducer(initialState, action)).toEqual(expectedState)
	});

	it('should end session', () => {
		const action = {
			type: types.LOGIN_SESSION_END
		}
		const expectedState = { ...initialState, isAuthenticated: false, jwt: undefined, user: undefined }
		window.localStorage.clear()
		// window.localStorage.setItem("user", JSON.stringify({"name":"test"}))
		expect(reducer(initialState, action)).toEqual(expectedState)
	});

});