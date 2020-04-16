import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {ExtractionDetailsView} from "../components/ExtractionDetailsView";
import PropTypes from "prop-types";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        selectedDocuments:[],
        groupedDocumentElements:[],
        isExtractionListDirty:false,
        textData:"",
    }
    const enzymeWrapper = shallow(<ExtractionDetailsView {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('ExtractionDetailsView', function() {
    it('ExtractionDetailsView should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('.extractionDetailsContainer').length).toBe(1);
    });
});