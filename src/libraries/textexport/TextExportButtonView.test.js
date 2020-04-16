import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {TextExportButtonView} from "./TextExportButtonView";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        data:"",
    }
    const enzymeWrapper = shallow(<TextExportButtonView {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('TextExportButtonView', function() {
    it('TextExportButtonView should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('Button').length).toBe(1);
    });
});