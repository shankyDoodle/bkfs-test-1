import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {EditableTable} from "./EditableTableView";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        tableData:[],
        headerData:["test"],
        csvData:[],
        classificationTableData:{},
        onTableCellDataChanged:jest.fn(),
        onSave:jest.fn(),
        onDiscard:jest.fn(),
        handleFileUpload:jest.fn()
    }
    const enzymeWrapper = shallow(<EditableTable {...props} />, { context: {} })
    return {
        props,
        enzymeWrapper
    }
}


describe('EditableTableView', function() {
    it('EditableTableView should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('.gridTableContainer').length).toBe(2);
    });
});