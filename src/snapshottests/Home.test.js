import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {Home} from "../components/Home";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        dispatch:jest.fn(),
        classes:{}
    }
    const enzymeWrapper = shallow(<Home {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('Home', function() {
    it('Home should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('.buttonWrapper').length).toBe(1);
    });
});