import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {ExtractionSelectionView} from "../components/ExtractionSelectionView";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        dispatch:jest.fn(),
        selectedDocuments:[],
        documentTypes:{},
        groupedDocumentElements:[],
        isExtractionListDirty:false,
    }
    const enzymeWrapper = shallow(<ExtractionSelectionView {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('ExtractionSelectionView', function() {
    it('ExtractionSelectionView should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('.extractionSelectionContainer').length).toBe(1);
    });
});