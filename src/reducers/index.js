import getInitialState from "./initial-state";

import {
  HANDLE_SCREEN_CHANGED
} from '../actions'

function handleScreenChanged(state, sScreenName) {
  console.log(state)
  return {
    ...state,
    currentScreen:sScreenName
  }
}

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case HANDLE_SCREEN_CHANGED:
      return handleScreenChanged(state, action.screenName);

    default:
      return state
  }
}
