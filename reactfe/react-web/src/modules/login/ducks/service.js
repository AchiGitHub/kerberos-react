// Redux-login service

import {
    createLogic
} from 'redux-logic';

import actions from './actions';
import types from './types';
// import endPoints from '../../../util/EndPoints';
// import API from '../../../util/HTTPClient';
import jwtDecode from 'jwt-decode';
import * as API from "../../../util/HTTPClient";
import Axios from 'axios';

const instance = Axios.create({
    // baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'credentials': 'include'}
  });


    let login = createLogic({

        type: types.LOGIN, // only apply this logic to this type
        latest: true, // only take latest
        debounce: 1000, // Wait 1 s before triggering another call

        // your code here, hook into one or more of these execution
        // phases: validate, transform, and/or process
        process({
            MockHTTPClient,
            getState,
            action
        }, dispatch, done) {

            console.log(action.payload)            
            // TODO: Remove
            // Mock response till backend integration
            if (action.payload.username === 'dil' && action.payload.password === '123') {
                var token = 'eyJhbGciOiJub25lIn0.eyJyb2xlaWQiOjEsInJvbGVuYW1lIjoiYWRtaW4iLCJuYW1lIjoiU3VwZXIiLCJsb2dpZCI6MywiaWQiOjEsImZ1bGxuYW1lIjoiQWRtaW4iLCJlbnRpdHkiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJzdWIiOiJ1c2VyX3Rva2VuIiwiaWF0IjoxNTE5NjQyMzgxfQ.';
                var decodedToken = jwtDecode(token);
                // console.log("Decoded token is", decodedToken);
                localStorage.setItem('jwt', token);
                var user = {
                    userName: decodedToken.username,
                    roleName: decodedToken.rolename,
                    name: decodedToken.name,
                    roleID: decodedToken.roleid
                }
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(actions.loginSuccess())
                dispatch(actions.sessionStart())
            } else {
                dispatch(actions.loginFailed({
                    title: "Error!",
                    message: "Invalid username or password."
                }))
            }
            done();
            return
            // END of mock response

            // let HTTPClient
            // if (MockHTTPClient) {
            //     HTTPClient = MockHTTPClient
            // } else {
            //     HTTPClient = API
            // }

            // HTTPClient.Post(endPoints.LOGIN, action.payload)
            //     .then(resp => resp.data)
            //     .then(token => {
            //         var decodedToken = jwtDecode(token);
            //         localStorage.setItem('jwt', token);
            //         var user = {
            //             userName: decodedToken.username,
            //             roleName: decodedToken.rolename,
            //             name: decodedToken.name,
            //             roleID: decodedToken.roleid
            //         }
            //         localStorage.setItem('user', JSON.stringify(user));
            //         HTTPClient.setAuth(); // Set token for subsequent calls
            //         return token
            //     })
            //     .then(token => dispatch(actions.loginSuccess(token)))
            //     // .then(() => dispatch(sessionActions.sessionStart()))
            //     .catch(err => {
            //         var errorMessage = "Invalid username or password.";

            //         console.error(err); // log since could be render err
            //         if (err && err.code === "ECONNABORTED") {
            //             errorMessage = "Please check your internet connection.";
            //         }

            //         dispatch(actions.loginFailed({
            //             title: "Error!",
            //             message: errorMessage
            //         }))
            //     })
            //     .then(() => done()); // call done when finished dispatching
        }
    })
    let loginWithSSO = createLogic({

        type: types.LOGIN_WITH_SSO, // only apply this logic to this type
        latest: true, // only take latest
        debounce: 1000, // Wait 1 s before triggering another call

        // your code here, hook into one or more of these execution
        // phases: validate, transform, and/or process
        process({
            MockHTTPClient,
            getState,
            action
        }, dispatch, done) {

            let HTTPClient
            if (MockHTTPClient) {
                HTTPClient = MockHTTPClient
            } else {
                HTTPClient = API
            }

            Axios.get('/ws/connect-with-sso')
                .then(resp => resp.data)
                .then(data => {
                    dispatch(actions.loginWithSSOSuccess(data.sso.user))
                    window.location = '/home'
                })
                .catch(err => {console.log(err)})
                .then(() => done()); // call done when finished dispatching
        }
    })

    // let loginWithSSOFetch = createLogic({

    //     type: types.LOGIN_WITH_SSO, // only apply this logic to this type
    //     latest: true, // only take latest
    //     debounce: 1000, // Wait 1 s before triggering another call

    //     // your code here, hook into one or more of these execution
    //     // phases: validate, transform, and/or process
    //     process({
    //         MockHTTPClient,
    //         getState,
    //         action
    //     }, dispatch, done) {

    //         let HTTPClient
    //         if (MockHTTPClient) {
    //             HTTPClient = MockHTTPClient
    //         } else {
    //             HTTPClient = API
    //         }
            
    //         async function connectWithSSO(){
    //             console.log('connectWithSSO');
    //             const json = await get('/ws/connect-with-sso');
    //             console.log('json: ', json);
    //             dispatch(actions.loginWithSSOSuccess(json))
    //             window.location = '/home'
    //           }
    //           connectWithSSO()
    //     }
    // })

    // let get = async function get(url = '') {
    //     const response = await fetch(url);
    //     if (response.status >= 400) {
    //       throw new Error(response.statusText);
    //     }
    //     return await response.json();
    //   }

    let getToken = createLogic({

        type: types.GET_USER_TOKEN, // only apply this logic to this type
        latest: true, // only take latest
        debounce: 1000, // Wait 1 s before triggering another call

        // your code here, hook into one or more of these execution
        // phases: validate, transform, and/or process
        process({
            MockHTTPClient,
            getState,
            action
        }, dispatch, done) {

            let HTTPClient
            if (MockHTTPClient) {
                HTTPClient = MockHTTPClient
            } else {
                HTTPClient = API
            }

            Axios.get('/ws/protected/secret')
            .then(res => res.data)
                .then(data => {
                    dispatch(actions.getUserTokenSuccess(data))
                })
                .catch(err => {
                    console.log("Error logging out. ", err)
                    window.location = '/'
                })
                .then(() => done()); // call done when finished dispatching
        }
    })

    let getHeader = createLogic({

        type: types.HEADER_TOKEN, // only apply this logic to this type
        latest: true, // only take latest
        debounce: 1000, // Wait 1 s before triggering another call

        // your code here, hook into one or more of these execution
        // phases: validate, transform, and/or process
        process({
            MockHTTPClient,
            getState,
            action
        }, dispatch, done) {

            let HTTPClient
            if (MockHTTPClient) {
                HTTPClient = MockHTTPClient
            } else {
                HTTPClient = API
            }

            instance.get('/login', {withCredentials: true})
            .then(res => res.data)
                .then(data => {
                    dispatch(actions.getUserTokenSuccess(data))
                })
                .catch(err => {
                    console.log("Error logging out. ", err)
                })
                .then(() => done()); // call done when finished dispatching
        }
    })

export default [
    // login,
    loginWithSSO,
    // loginWithSSOFetch,
    getToken,
    getHeader
]