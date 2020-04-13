import getInitialState from "./initial-state";

import {screenNames} from "../constants/appConstants";
import * as appActions from '../actions'

import classification from "./reducer-classification";

function handleScreenChanged(state, sScreenName) {

    let oRet = {...state}
    if (sScreenName === screenNames.CLASSIFICATION) {
        classification.switchToClassificationScreen(oRet);
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
