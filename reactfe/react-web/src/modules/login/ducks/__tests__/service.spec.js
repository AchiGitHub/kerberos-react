import { combineReducers } from 'redux'
import { createMockStore } from 'redux-logic-test'

import reducer from '../reducers'
import types from '../types'
import service from '../service'

const appReducer = combineReducers({
    Login: reducer
})


// these can be customized/mocked for use in testing
const injectedDeps = {
    MockHTTPClient: { //simulate an async fetch
        Post() { return Promise.resolve("OK"); }
    },
    localStorage: window.localStorage
};

const appLogic = service;

describe('Login >> Service', () => {
    let store;
    beforeEach(() => {
        store = createMockStore({
            reducer: appReducer,
            logic: [...appLogic],
            injectedDeps
        });
    });

    it('should login', done => {
        const payload = { username: "dil", password: "123" }
        store.dispatch({ type: types.LOGIN, payload: payload }); // start fetching
        store.whenComplete(() => { // all logic has completed
            // console.log(store.actions)
            expect(store.actions).toEqual([
                { type: types.LOGIN, payload: payload },
                { type: types.LOGIN_SUCCESS },
                { type: types.LOGIN_SESSION_START }
            ]);
            done();
        });
    });

    it('should not login', done => {
        const payload = { username: "dil2", password: "123" }
        store.dispatch({ type: types.LOGIN, payload: payload }); // start fetching
        store.whenComplete(() => { // all logic has completed
            // console.log(store.actions)
            expect(store.actions).toEqual([
                { type: types.LOGIN, payload: payload },
                { type: types.LOGIN_FAILED, payload: { "message": "Invalid username or password.", "title": "Error!" } }
            ]);
            done();
        });
    });

});


