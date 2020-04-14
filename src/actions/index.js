export const HANDLE_SCREEN_CHANGED = 'HANDLE_SCREEN_CHANGED';
export const HANDLE_CLASSIFICATION_DROP_DOWN_ON_BLUR = 'HANDLE_CLASSIFICATION_DROP_DOWN_ON_BLUR';
export const HANDLE_CLASSIFICATION_CREATE_BUTTON_CLICKED = 'HANDLE_CLASSIFICATION_CREATE_BUTTON_CLICKED';
export const HANDLE_TABLE_CELL_DATA_CHANGED = 'HANDLE_TABLE_CELL_DATA_CHANGED';
export const HANDLE_TABLE_SAVE_DISCARD_CLICKED = 'HANDLE_TABLE_SAVE_DISCARD_CLICKED';

export const HANDLE_EXTRACTION_DROP_DOWN_ON_BLUR = 'HANDLE_EXTRACTION_DROP_DOWN_ON_BLUR';
export const HANDLE_EXTRACTION_CREATE_BUTTON_CLICKED = 'HANDLE_EXTRACTION_CREATE_BUTTON_CLICKED';
export const HANDLE_EXTRACTION_LIST_DRAG_END = 'HANDLE_EXTRACTION_LIST_DRAG_END';


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