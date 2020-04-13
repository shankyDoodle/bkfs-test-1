export const HANDLE_SCREEN_CHANGED = 'HANDLE_SCREEN_CHANGED';
export const HANDLE_CLASSIFICATION_DROP_DOWN_ON_BLUR = 'HANDLE_CLASSIFICATION_DROP_DOWN_ON_BLUR';
export const HANDLE_CLASSIFICATION_CREATE_BUTTON_CLICKED = 'HANDLE_CLASSIFICATION_CREATE_BUTTON_CLICKED';


export const handleScreenChanged = (sScreenName) => ({
  type: HANDLE_SCREEN_CHANGED,
  screenName: sScreenName
});

export const handleClassificationDropDownOnBlur=(dropdownButtonType, selectedItems)=>({
  type: HANDLE_CLASSIFICATION_DROP_DOWN_ON_BLUR,
  dropdownButtonType: dropdownButtonType,
  selectedItems:selectedItems
})

export const handleClassificationCreateButtonCLicked=()=>({
  type: HANDLE_CLASSIFICATION_CREATE_BUTTON_CLICKED,
})