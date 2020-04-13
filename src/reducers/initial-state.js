export default function getInitialState() {
    let sCurrentScreen = "HOME";

    let oCustomerList = {};
    let aSelectedCustomers = [];
    let oDocumentTypes = {};
    let aSelectedDocuments =[];
    let oCustomerData = {};
    let oCustomerDataCloned = null;

    let oClassificationTableData = {};
    let oClassificationTableDataCloned = null;

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
    }
}