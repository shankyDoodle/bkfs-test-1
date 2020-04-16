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
    originalCSVData:[],
    isScreenDirty: false,
    groupedDocumentElements:[],
    originalGroupedDocumentElements:null,
    isExtractionListDirty:false,
    textData:"",
    selectedDocumentSamples:{}
}

export const defaultState = initialState;

export const getInitialState = function () {
    return {
        ...initialState
    }
}