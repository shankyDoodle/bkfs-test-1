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


export const handleScreenChanged = (sScreenName) => ({
  type: HANDLE_SCREEN_CHANGED,
  screenName: sScreenName
});

export const handleClassificationDropDownOnBlur=(dropdownButtonType, selectedItems)=>({
  type: HANDLE_CLASSIFICATION_DROP_DOWN_ON_BLUR,
  dropdownButtonType: dropdownButtonType,
  selectedItems:selectedItems
})

export const handleClassificationCreateButtonCLicked=(oCustomerData, oDocumentSamples)=>({
  type: HANDLE_CLASSIFICATION_CREATE_BUTTON_CLICKED,
  customerData:oCustomerData,
  documentSamples:oDocumentSamples
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

export const handleExtractionCreateButtonCLicked=()=>({
  type: HANDLE_EXTRACTION_CREATE_BUTTON_CLICKED
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
    return axios.all([
      axios.post(URLMappings.GetSelectedCustomerData,  {selectedCustomerIds:selectedCustomerIds}),
      axios.post(URLMappings.GetSelectedDocumentSamples, {selectedDocumentTypeIds: selectedDocumentTypeIds})
    ])
        .then(axios.spread((custRes, docRes) => {
          dispatch(handleClassificationCreateButtonCLicked(custRes.data, docRes.data));
        })).catch(e => dispatch(handleServerFailure(e)));
  };
}