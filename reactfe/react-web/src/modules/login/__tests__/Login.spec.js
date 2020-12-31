
import React from 'react';
import { mount, shallow } from 'enzyme';

import { Message } from 'semantic-ui-react'

import { Login } from '../Login';

describe('Login >> connected componenet', () => {
    let container


    it('should render the Login component', () => {
        container = shallow(<Login />)
        expect(container).toMatchSnapshot()
    });

    it('should disable submit button initially', () => {
        container = shallow(<Login />)
        expect(container.find('#submit')).toHaveLength(1)
        expect(container.find('#submit').prop('disabled')).toEqual(true)
    });

    it('should change route to /', () => {
        const mockFn = jest.fn()
        container = shallow(<Login isAuthenticated={true} history={{ push: mockFn }} />)
        expect(mockFn).toHaveBeenCalled();
    });

    it('should disable the submit button when only username is given', () => {
        const mockFn = jest.fn()
        container = shallow(<Login loginFieldChanged={mockFn} />)
        container.find('#username').simulate('change', { target: { value: 'dil' } })
        expect(mockFn).toHaveBeenCalled();
        expect(container.find('#submit').prop('disabled')).toEqual(true)
    });

    it('should login when credentials supplied', () => {
        const mockFn = jest.fn()
        const mockLogin = jest.fn()
        container = shallow(<Login loginFieldChanged={mockFn} login={mockLogin} />)
        container.find('#username').simulate('change', { target: { value: 'dil' } })
        container.find('#password').simulate('change', { target: { value: '123' } })
        expect(mockFn).toHaveBeenCalled();
        container.find('#submit').simulate('click')
        expect(mockLogin).toHaveBeenCalled();
    });

    it('should cancel username and password fields', () => {
        const mockFn = jest.fn()
        const mockLoginCancel = jest.fn()
        container = shallow(<Login loginFieldChanged={mockFn} loginCancel={mockLoginCancel} />)
        container.find('#username').simulate('change', { target: { value: 'dil' } })
        container.find('#password').simulate('change', { target: { value: '123' } })
        expect(mockFn).toHaveBeenCalled();        
        expect(container.state('password')).toEqual('123')
        container.find('#clear').simulate('click')        
        expect(container.state('password')).toEqual('')
        // expect(container.prop('username')).toEqual('')
        // expect(container.find('#password')).toEqual('')
    });

    it('should show error message', () => {
        container = shallow(<Login hasError={true} error={{ title: '', message: '' }} />)
        expect(container.find(Message).prop('negative')).toEqual(true)
    });


});


