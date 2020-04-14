let initialState = {
    currentScreen: "HOME",
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
    textData:""
}

export const defaultState = initialState;

export const getInitialState = function () {
    return {
        ...initialState
    }
}