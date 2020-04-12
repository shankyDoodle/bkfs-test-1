import getInitialState from "./initial-state";

import {
  HOME_BUTTON_CLICKED
} from '../actions'

function handleHomeButtonClicked(state, id) {
  console.log(state)
  return getInitialState()
}

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case HOME_BUTTON_CLICKED:
      return handleHomeButtonClicked(state, action.id);

    default:
      return state
  }
}
