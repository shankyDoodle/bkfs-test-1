export default function getInitialState() {
    let sCurrentScreen = "HOME";
    let isScreenDirty = false;

    let oCustomerList = {};
    let aSelectedCustomers = [];
    let oDocumentTypes = {};
    let aSelectedDocuments =[];
    let oCustomerData = {};
    let oCustomerDataCloned = null;

    let oClassificationTableData = {};
    let oClassificationTableDataCloned = null;

    let aCSVData = []

    return {
        currentScreen: sCurrentScreen,
        customerList: oCustomerList,
        selectedCustomers: aSelectedCustomers,
        documentTypes: oDocumentTypes,
        selectedDocuments:aSelectedDocuments,
        customerData: oCustomerData,
        customerDataCloned: oCustomerDataCloned,
        classificationTableData: oClassificationTableData,
        classificationTableDataCloned: oClassificationTableDataCloned,
        csvData:aCSVData,
        isScreenDirty: isScreenDirty,
    }
}