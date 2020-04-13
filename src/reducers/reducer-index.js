import getInitialState from "./initial-state";

import {screenNames} from "../constants/appConstants";
import * as appActions from '../actions'

import classification from "./reducer-classification";

function handleScreenChanged(state, sScreenName) {

  let oRet = {...state}
  if(sScreenName === screenNames.CLASSIFICATION){
    let customerList = classification.fetchCustomerList();
    let documentTypes = classification.fetchDocumentTypes();
    Object.assign(oRet, {customerList, documentTypes});
  }

  Object.assign(oRet, {currentScreen:sScreenName});

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
    default:
      return state
  }
}
