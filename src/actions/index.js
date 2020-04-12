export const HANDLE_SCREEN_CHANGED = 'HANDLE_SCREEN_CHANGED';


export const handleScreenChanged = (sScreenName) => ({
  type: HANDLE_SCREEN_CHANGED,
  screenName: sScreenName
});

