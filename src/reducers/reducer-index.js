import {getInitialState, defaultState} from "./initial-state";

import {screenNames} from "../constants/appConstants";
import * as appActions from '../actions'

import classification from "./reducer-classification";
import extraction from "./reducer-extraction";

function resetToInitialState(oRet) {
    Object.assign(oRet, {...defaultState});
}
function handleScreenChanged(state, sScreenName) {
    let oRet = {...state}
    if(sScreenName === screenNames.HOME){
        resetToInitialState(oRet)
    }
    Object.assign(oRet, {currentScreen: sScreenName});
    return oRet
}

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case appActions.HANDLE_SCREEN_CHANGED:
            return handleScreenChanged(state, action.screenName);

        case appActions.HANDLE_CLASSIFICATION_DROP_DOWN_ON_BLUR:
            return classification.handleClassificationDropDownOnBlur(state, action.dropdownButtonType, action.selectedItems);

        case appActions.HANDLE_CLASSIFICATION_CREATE_BUTTON_CLICKED:
            return classification.handleClassificationCreateButtonCLicked(state, action.customerData);

        case appActions.HANDLE_TABLE_CELL_DATA_CHANGED:
            return classification.handleTableCellDataChanged(state, action.customerName, action.docName, action.newVal);

        case appActions.HANDLE_TABLE_SAVE_DISCARD_CLICKED:
            return classification.handleTableSaveDiscardClicked(state, action.buttonType);

        case appActions.HANDLE_EXTRACTION_DROP_DOWN_ON_BLUR:
            return extraction.handleExtractionDropDownOnBlur(state, action.dropdownButtonType, action.selectedItems);

        case appActions.HANDLE_EXTRACTION_CREATE_BUTTON_CLICKED:
            return extraction.handleExtractionCreateButtonCLicked(state, action.groupedElements);

        case appActions.HANDLE_EXTRACTION_LIST_DRAG_END:
            return extraction.handleExtractionListDragEnd(state, action.source, action.destination);

        case appActions.SET_CLASSIFICATION_SCREEN_ON_LOAD_DATA:
            return classification.setClassificationScreenOnLoadData(state, action.customerList, action.documentTypes);

        case appActions.SET_EXTRACTION_SCREEN_ON_LOAD_DATA:
            return extraction.setExtractionScreenOnLoadData(state, action.documentTypes);

        case appActions.HANDLE_EXTRACTION_SAVE_AFTER_EFFECTS:
            return extraction.handleExtractionSaveAfterEffects(state);

        case appActions.HANDLE_EXTRACTION_DISCARD_CLICKED:
            return extraction.handleExtractionDiscardClicked(state);

        case appActions.HANDLE_NEW_CUSTOMER_ADDED_AFTER_EFFECTS:
            return classification.handleNewCustomerAddedAfterEffects(state, action.newCustomerData);

        case appActions.HANDLE_NEW_DOC_TYPE_ADDED_AFTER_EFFECTS:
            return classification.handleNewDocTypeAddedAfterEffects(state, action.newCustomerData);

        default:
            return state
    }
}
