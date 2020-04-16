import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import PDFView from "./PDFView";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        documentId:"",
    }
    const enzymeWrapper = shallow(<PDFView {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('PDFView', function() {
    it('PDFView should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('.pdfViewerContainer').length).toBe(1);
    });
});