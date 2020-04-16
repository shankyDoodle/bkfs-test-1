import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import DraggableListGroupView from "./DraggableListGroupView";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        onDragEnd:jest.fn(),
        lists:[]
    }
    const enzymeWrapper = shallow(<DraggableListGroupView {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('DraggableListGroupView', function() {
    it('DraggableListGroupView should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('DragDropContext').length).toBe(1);
    });
});