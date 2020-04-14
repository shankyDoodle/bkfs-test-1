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
}

export const defaultState = initialState;

export const getInitialState = function () {
    return {
        ...initialState
    }
}