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

    switch(sScreenName){
        case screenNames.CLASSIFICATION:
            classification.switchToClassificationScreen(oRet);
            break;
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
            return classification.handleClassificationCreateButtonCLicked(state);

        case appActions.HANDLE_TABLE_CELL_DATA_CHANGED:
            return classification.handleTableCellDataChanged(state, action.customerName, action.docName, action.newVal);

        case appActions.HANDLE_TABLE_SAVE_DISCARD_CLICKED:
            return classification.handleTableSaveDiscardClicked(state, action.buttonType);

        default:
            return state
    }
}
