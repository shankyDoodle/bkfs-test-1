export default function getInitialState() {
    let sCurrentScreen = "HOME";

    let oCustomerList = {};
    let aSelectedCustomers = [];
    let oDocumentTypes = {};
    let aSelectedDocuments =[];
    let oCustomerData = {};

    let oClassificationTableData = {};

    return {
        currentScreen: sCurrentScreen,
        customerList: oCustomerList,
        selectedCustomers: aSelectedCustomers,
        documentTypes: oDocumentTypes,
        selectedDocuments:aSelectedDocuments,
        customerData: oCustomerData,
        classificationTableData: oClassificationTableData,
    }
}