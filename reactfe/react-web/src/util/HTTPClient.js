import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['WWW-Authenticate'] = 'Negotiate';
// Create axios instance for api calls
var instance = null;

const setAuth = () => {
    instance = axios.create({
        baseURL: '',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export default {
    Get: (route, data) => {
        instance || setAuth()
        return instance.get(route, data);
    },
    Post: (route, data) => {
        instance || setAuth()
        return instance.post(route, JSON.stringify(data))
    },
    Put: (route, data) => {
        instance || setAuth()
        return instance.put(route, JSON.stringify(data))
    }
}
