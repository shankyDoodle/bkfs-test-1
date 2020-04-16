import URLMappings from "./axios-url-mappings"
import axios from 'axios'


export const HANDLE_SCREEN_CHANGED = 'HANDLE_SCREEN_CHANGED';
export const HANDLE_CLASSIFICATION_DROP_DOWN_ON_BLUR = 'HANDLE_CLASSIFICATION_DROP_DOWN_ON_BLUR';
export const HANDLE_CLASSIFICATION_CREATE_BUTTON_CLICKED = 'HANDLE_CLASSIFICATION_CREATE_BUTTON_CLICKED';
export const HANDLE_TABLE_CELL_DATA_CHANGED = 'HANDLE_TABLE_CELL_DATA_CHANGED';
export const HANDLE_TABLE_SAVE_DISCARD_CLICKED = 'HANDLE_TABLE_SAVE_DISCARD_CLICKED';

export const HANDLE_EXTRACTION_DROP_DOWN_ON_BLUR = 'HANDLE_EXTRACTION_DROP_DOWN_ON_BLUR';
export const HANDLE_EXTRACTION_CREATE_BUTTON_CLICKED = 'HANDLE_EXTRACTION_CREATE_BUTTON_CLICKED';
export const HANDLE_EXTRACTION_LIST_DRAG_END = 'HANDLE_EXTRACTION_LIST_DRAG_END';

export const SET_CLASSIFICATION_SCREEN_ON_LOAD_DATA = 'SET_CLASSIFICATION_SCREEN_ON_LOAD_DATA';
export const SET_EXTRACTION_SCREEN_ON_LOAD_DATA = 'SET_EXTRACTION_SCREEN_ON_LOAD_DATA';
export const HANDLE_EXTRACTION_SAVE_AFTER_EFFECTS = 'HANDLE_EXTRACTION_SAVE_AFTER_EFFECTS';
export const HANDLE_EXTRACTION_DISCARD_CLICKED = 'HANDLE_EXTRACTION_DISCARD_CLICKED';
export const HANDLE_NEW_CUSTOMER_ADDED_AFTER_EFFECTS = 'HANDLE_NEW_CUSTOMER_ADDED_AFTER_EFFECTS';
export const HANDLE_NEW_DOC_TYPE_ADDED_AFTER_EFFECTS = 'HANDLE_NEW_DOC_TYPE_ADDED_AFTER_EFFECTS';


export const handleScreenChanged = (sScreenName) => ({
  type: HANDLE_SCREEN_CHANGED,
  screenName: sScreenName
});

export const handleClassificationDropDownOnBlur=(dropdownButtonType, selectedItems)=>({
  type: HANDLE_CLASSIFICATION_DROP_DOWN_ON_BLUR,
  dropdownButtonType: dropdownButtonType,
  selectedItems:selectedItems
})

export const handleClassificationCreateButtonCLicked=(oCustomerData)=>({
  type: HANDLE_CLASSIFICATION_CREATE_BUTTON_CLICKED,
  customerData:oCustomerData
})

export const handleTableCellDataChanged=(customerName, docName, newVal)=>({
  type:HANDLE_TABLE_CELL_DATA_CHANGED,
  customerName:customerName,
  docName:docName,
  newVal:newVal
})

export const handleTableSaveDiscardClicked = (buttonType) => ({
  type: HANDLE_TABLE_SAVE_DISCARD_CLICKED,
  buttonType: buttonType
});

export const handleExtractionDropDownOnBlur=(dropdownButtonType, selectedItems)=>({
  type: HANDLE_EXTRACTION_DROP_DOWN_ON_BLUR,
  dropdownButtonType: dropdownButtonType,
  selectedItems:selectedItems
})

export const handleExtractionCreateButtonCLicked=(groupedElements)=>({
  type: HANDLE_EXTRACTION_CREATE_BUTTON_CLICKED,
  groupedElements:groupedElements
})

export const handleExtractionListDragEnd=(source, destination)=>({
  type:HANDLE_EXTRACTION_LIST_DRAG_END,
  source:source,
  destination:destination
})

const handleServerFailure= function (error) {
  console.log(error);
}

const setClassificationScreenOnLoadData=(customerList, documentTypes)=>({
  type: SET_CLASSIFICATION_SCREEN_ON_LOAD_DATA,
  customerList:customerList,
  documentTypes:documentTypes
})

export function fetchClassificationScreenData() {
  return dispatch => {
    return axios.all([
      axios.get(URLMappings.GetCustomerList),
      axios.get(URLMappings.GetDocumentTypes)
    ])
        .then(axios.spread((custRes, docRes) => {
          dispatch(setClassificationScreenOnLoadData(custRes.data, docRes.data));
        })).catch(e => dispatch(handleServerFailure(e)));
  };
}


export function handleClassificationCreateButtonCLickedServerCall(selectedCustomerIds, selectedDocumentTypeIds) {
  return dispatch => {
    return axios.post(URLMappings.GetSelectedCustomerData,  {selectedCustomerIds:selectedCustomerIds})
        .then(res => {
          dispatch(handleClassificationCreateButtonCLicked(res.data));
        }).catch(e => dispatch(handleServerFailure(e)));
  };
}


export function handleTableSaveServerData(dirtyCustomerData) {
  return dispatch => {
    return axios.post(URLMappings.SaveTableData, {dirtyCustomerData: dirtyCustomerData})
        .then((res) => {
          console.log("save succesful")
        }).catch(e => dispatch(handleServerFailure(e)));
  };
}

const setExtractionScreenOnLoadData=(documentTypes)=>({
  type: SET_EXTRACTION_SCREEN_ON_LOAD_DATA,
  documentTypes:documentTypes
})

export function fetchExtractionScreenData() {
  return dispatch => {
    return axios.get(URLMappings.GetDocumentTypes)
        .then((res) => {
          dispatch(setExtractionScreenOnLoadData(res.data));
        }).catch(e => dispatch(handleServerFailure(e)));
  };
}

export function handleExtractionCreateButtonClickedFetchData(documentId) {
  return dispatch => {
    return axios.get(URLMappings.GetGroupedElementsByDocId, {params:{documentId:documentId}})
        .then(res => {
          dispatch(handleExtractionCreateButtonCLicked(res.data));
        }).catch(e => dispatch(handleServerFailure(e)));
  };
}

export const handleExtractionDiscardClicked=()=>({
  type: HANDLE_EXTRACTION_DISCARD_CLICKED,
})

const handleExtractionSaveAfterEffects=()=>({
  type: HANDLE_EXTRACTION_SAVE_AFTER_EFFECTS,
})

export function handleExtractionSaveClicked(groupedDocumentElements, selectedDocumentTypeId) {
  return dispatch => {
    return axios.post(URLMappings.SaveGroupedElementData,  {
      selectedDocumentId:selectedDocumentTypeId,
      groupedDocumentElements:groupedDocumentElements
    })
        .then(res => {
          dispatch(handleExtractionSaveAfterEffects());
        }).catch(e => dispatch(handleServerFailure(e)));
  };
}

const handleNewCustomerAddedAfterEffects=(oNewCustData)=>({
  type: HANDLE_NEW_CUSTOMER_ADDED_AFTER_EFFECTS,
  newCustomerData: oNewCustData
})

export function handleNewCustomerAdded(newCustomerName) {
  return dispatch => {
    return axios.post(URLMappings.AddNewCustomer,  {
      newCustomerName:newCustomerName
    })
        .then(res => {
          dispatch(handleNewCustomerAddedAfterEffects(res.data));
        }).catch(e => dispatch(handleServerFailure(e)));
  };
}


const handleNewDocTypeAddedAfterEffects=(oNewDocTypeData)=>({
    type: HANDLE_NEW_DOC_TYPE_ADDED_AFTER_EFFECTS,
    newCustomerData: oNewDocTypeData
})

export function handleNewDocumentTypeAdded(sDocTypeName) {
  return dispatch => {
    return axios.post(URLMappings.AddNewDocumentType,  {
        newDocumentTypeName:sDocTypeName
    })
        .then(res => {
          dispatch(handleNewDocTypeAddedAfterEffects(res.data));
        }).catch(e => dispatch(handleServerFailure(e)));
  };
}

export function handleDocumentSampleUpload(docId, base64File) {
  return dispatch => {
    return axios.post(URLMappings.AddNewDocumentSample,  {
        documentTypeId:docId,
        base64File:base64File
    })
        .then(res => {
          console.log("File Success");
        }).catch(e => dispatch(handleServerFailure(e)));
  };
}