import {getInitialState, defaultState} from "./initial-state";

import {screenNames} from "../constants/appConstants";
import * as appActions from '../actions'

import classification from "./reducer-classification";
import extraction from "./reducer-extraction";
import {HANDLE_EXTRACTION_DROP_DOWN_ON_BLUR} from "../actions";



function resetToInitialState(oRet) {
    Object.assign(oRet, {...defaultState});
}
function handleScreenChanged(state, sScreenName) {
    let oRet = {...state}

    switch(sScreenName){
        case screenNames.EXTRACTION:
            extraction.switchToExtractionScreen(oRet)
            break;
        case screenNames.HOME:
        default:
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
            return classification.handleClassificationCreateButtonCLicked(state, action.customerData, action.documentSamples);

        case appActions.HANDLE_TABLE_CELL_DATA_CHANGED:
            return classification.handleTableCellDataChanged(state, action.customerName, action.docName, action.newVal);

        case appActions.HANDLE_TABLE_SAVE_DISCARD_CLICKED:
            return classification.handleTableSaveDiscardClicked(state, action.buttonType);

        case appActions.HANDLE_EXTRACTION_DROP_DOWN_ON_BLUR:
            return extraction.handleExtractionDropDownOnBlur(state, action.dropdownButtonType, action.selectedItems);

        case appActions.HANDLE_EXTRACTION_CREATE_BUTTON_CLICKED:
            return extraction.handleExtractionCreateButtonCLicked(state);

        case appActions.HANDLE_EXTRACTION_LIST_DRAG_END:
            return extraction.handleExtractionListDragEnd(state, action.source, action.destination);

        case appActions.SET_CLASSIFICATION_SCREEN_ON_LOAD_DATA:
            return classification.setClassificationScreenOnLoadData(state, action.customerList, action.documentTypes);

        default:
            return state
    }
}
