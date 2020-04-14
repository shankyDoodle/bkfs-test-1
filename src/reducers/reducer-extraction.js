import _ from 'lodash'

import {
    documentTypes,
    groupedDocElements
} from "../mockdata/mockData";

import * as appConstants from '../constants/appConstants';
import {Utils} from '../utils/utils';

export default {
    fetchDocumentTypes: function () {
        //implement server call here fro customer data
        return documentTypes;
    },

    fetchSampleFile: function (docName) {
        //TODO: ideally fetch files from server
        return documentTypes[docName];
    },

    fetchGroupedDocumentElementsByDocumentName: function (docName) {
        //TODO: ideally fetch files from server
        return groupedDocElements
    },

    switchToExtractionScreen: function (oRet) {
        let documentTypes = this.fetchDocumentTypes();
        Object.assign(oRet, {documentTypes});
    },

    handleExtractionDropDownOnBlur: function (state, dropdownType, selectedItems) {
        return {
            ...state,
            selectedDocuments: selectedItems
        };
    },

    createSingleCSVData: function(aGroupedDocumentData){
        let aData = [];
        for(let oData of aGroupedDocumentData){
            for(let dataElement of oData.dataElements){
                aData.push([dataElement])
            }
        }
        return aData;
    },

    handleExtractionCreateButtonCLicked: function (state) {
        let sSelectedDoc = state.selectedDocuments[0];
        let aGroupedDocumentData = this.fetchGroupedDocumentElementsByDocumentName(sSelectedDoc);
        let oFile = this.fetchSampleFile();

        let csvData = this.createSingleCSVData(aGroupedDocumentData);

        return{
            ...state,
            csvData,
            groupedDocumentElements: aGroupedDocumentData,
            extractedSampleFile: oFile
        }

    }

}