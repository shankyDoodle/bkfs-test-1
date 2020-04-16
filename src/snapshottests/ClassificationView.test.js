import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {ClassificationView} from "../components/ClassificationView";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        classificationTableData: {},
        customerData: {},
        csvData:[],
        dispatch:jest.fn()
    }
    const enzymeWrapper = shallow(<ClassificationView {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('ClassificationView', function() {
    it('TabView should be present', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('TabView').length).toBe(1)
    });

    // it('should mount in a full DOM', function() {
    //     expect(mount(<Foo />).find('.foo').length).toBe(1);
    // });
    //
    // it('should render to static HTML', function() {
    //     expect(render(<Foo />).text()).toEqual('Bar');
    // });
});