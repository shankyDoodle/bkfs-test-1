import {screenNames} from "../constants/appConstants";

let initialState = {
    currentScreen: screenNames.HOME,
    customerList: {},
    selectedCustomers: [],
    documentTypes: {},
    selectedDocuments:[],
    customerData: {},
    classificationTableData: {},
    csvData:[],
    isScreenDirty: false,
    groupedDocumentElements:[],
    extractedSampleFile:null,
    textData:"",
    selectedDocumentSamples:{}
}

export const defaultState = initialState;

export const getInitialState = function () {
    return {
        ...initialState
    }
}