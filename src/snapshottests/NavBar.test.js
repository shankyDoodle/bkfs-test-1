import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {NavBar} from "../components/NavBar";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        dispatch:jest.fn(),
        classes:{}
    }
    const enzymeWrapper = shallow(<NavBar {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('NavBar', function() {
    it('NavBar should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('.navBar').length).toBe(1);
    });
});