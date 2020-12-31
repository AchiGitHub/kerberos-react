import configureStore from 'redux-mock-store';

import actions from '../actions'
import types from '../types'

const mockStore = configureStore();
const store = mockStore();

describe('Login Actions', () => {
  
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  describe('Login actions >> Login', () => {
    it('should create an action to login', () => {
      var u = "dil"
      var p = "123"

      store.dispatch(actions.login({
        username: u, password: p
      }));

      const expectedAction = [{
        type: types.LOGIN,
        payload: {
          username: u, password: p
        }
      }]

      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  describe('Login actions >> Login cancel', () => {
    it('should create and action to clear the login', () => {
      store.dispatch(actions.loginCancel());
      const expectedAction = [{
        type: types.LOGIN_CLEAR
      }]
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  describe('Login actions >> Field changed', () => {
    it('should create and action for login failed', () => {
      store.dispatch(actions.loginFailed());
      const expectedAction = [{
        type: types.LOGIN_FAILED
      }]
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  describe('Login actions >> Login success', () => {
    it('should create and action for login success', () => {
      store.dispatch(actions.loginSuccess());
      const expectedAction = [{
        type: types.LOGIN_SUCCESS
      }]
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  describe('Login actions >> Field changed', () => {
    it('should create and action to change the field', () => {
      store.dispatch(actions.loginFieldChanged("key", "val"));
      const expectedAction = [{
        type: types.LOGIN_FIELD_CHANGED,
        payload: { k: "key", v: "val" }
      }]
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})