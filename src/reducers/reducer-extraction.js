import _ from 'lodash'

import {
    documentTypes,
    groupedDocElements
} from "../mockdata/mockData";

import * as appConstants from '../constants/appConstants';
import {Utils} from '../utils/utils';

export default {
    fetchSampleFile: function (docName) {
        //TODO: ideally fetch files from server
        return "./pdfs/"+ documentTypes[docName];
    },

    fetchGroupedDocumentElementsByDocumentName: function (docName) {
        //TODO: ideally fetch files from server
        return groupedDocElements
    },

    setExtractionScreenOnLoadData: function (state, documentTypes) {
        return {
            ...state,
            documentTypes
        }
    },

    handleExtractionDropDownOnBlur: function (state, dropdownType, selectedItems) {
        return {
            ...state,
            selectedDocuments: [selectedItems]
        };
    },

    createSingleTextData: function (aGroupedDocumentData) {
        let sData = "";
        for (let oData of aGroupedDocumentData) {
            for (let dataElement of oData.dataElements) {
                sData+=dataElement+"\n";
            }
        }
        return sData;
    },

    handleExtractionCreateButtonCLicked: function (state) {
        let sSelectedDoc = state.selectedDocuments[0];
        let aGroupedDocumentData = this.fetchGroupedDocumentElementsByDocumentName(sSelectedDoc);
        let oFile = this.fetchSampleFile(sSelectedDoc);

        let textData = this.createSingleTextData(aGroupedDocumentData);

        return {
            ...state,
            textData,
            groupedDocumentElements: aGroupedDocumentData,
            extractedSampleFile: oFile
        }

    },

    moveWithinSameList: (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    },

    handleExtractionListDragEnd: function (state, source, destination) {
        let aGroups = Array.from(state.groupedDocumentElements);

        let sSourceGroupId = source.groupId
        let oFoundSourceGroup = aGroups.find(oG => oG.groupId === sSourceGroupId)
        let sDestGroupId = destination.groupId
        if (sSourceGroupId === sDestGroupId) {
            oFoundSourceGroup.dataElements = this.moveWithinSameList(oFoundSourceGroup.dataElements, source.index, destination.index);
        }else{
            let oFoundDestGroup = aGroups.find(oG => oG.groupId === sDestGroupId)
            let [removed] = oFoundSourceGroup.dataElements.splice(source.index, 1);
            oFoundDestGroup.dataElements.splice(destination.index, 0, removed);
        }

        let textData = this.createSingleTextData(aGroups);
        return {
            ...state,
            textData,
            groupedDocumentElements: aGroups
        }
    }
}