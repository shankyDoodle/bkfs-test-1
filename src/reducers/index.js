import getInitialState from "./initial-state";

import {screenNames} from "../constants/appConstants";

import {
  HANDLE_SCREEN_CHANGED
} from '../actions'


import classification from "./classification";

function handleScreenChanged(state, sScreenName) {

  let oRet = {...state}
  if(sScreenName === screenNames.CLASSIFICATION){
    let customerList = classification.fetchCustomerList();
    Object.assign(oRet, {customerList});
  }

  Object.assign(oRet, {currentScreen:sScreenName});

  return oRet
}

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case HANDLE_SCREEN_CHANGED:
      return handleScreenChanged(state, action.screenName);

    default:
      return state
  }
}
