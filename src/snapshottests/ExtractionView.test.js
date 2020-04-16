import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {ExtractionView} from "../components/ExtractionView";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        dispatch:jest.fn(),
    }
    const enzymeWrapper = shallow(<ExtractionView {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('ExtractionView', function() {
    it('ExtractionView should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('TabView').length).toBe(1);
    });
});