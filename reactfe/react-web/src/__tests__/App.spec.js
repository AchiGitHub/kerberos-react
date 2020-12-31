import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App >> connected componenet', () => {
    let container

    it('should render the App component', () => {
        container = shallow(<App />)
        expect(container).toMatchSnapshot()
    });
})