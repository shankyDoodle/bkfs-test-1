import _ from 'lodash'

export default {
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

    handleExtractionCreateButtonCLicked: function (state, groupedElements) {
        let aGroupedDocumentData = groupedElements;
        let textData = this.createSingleTextData(aGroupedDocumentData);
        let extractionCreateClickedDocId = state.selectedDocuments[0];
        return {
            ...state,
            textData,
            groupedDocumentElements: aGroupedDocumentData,
            originalGroupedDocumentElements: _.cloneDeep(aGroupedDocumentData),
            extractionCreateClickedDocId:extractionCreateClickedDocId
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
            groupedDocumentElements: aGroups,
            isExtractionListDirty:true
        }
    },

    handleExtractionSaveAfterEffects: function (state) {
        let aGroups = _.cloneDeep(state.groupedDocumentElements);
        let textData = this.createSingleTextData(aGroups);
        return {
            ...state,
            textData,
            groupedDocumentElements: aGroups,
            originalGroupedDocumentElements:_.cloneDeep(aGroups),
            isExtractionListDirty:false
        }
    },

    handleExtractionDiscardClicked: function (state) {
        let aGroups = _.cloneDeep(state.originalGroupedDocumentElements);
        let textData = this.createSingleTextData(aGroups);
        return {
            ...state,
            textData,
            groupedDocumentElements: aGroups,
            originalGroupedDocumentElements:_.cloneDeep(aGroups),
            isExtractionListDirty:false
        }
    }

}