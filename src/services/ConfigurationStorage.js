const KEY = 'CONFIG';

export const saveTheme = (theme) => {
  let state = JSON.parse(localStorage.getItem(KEY));
  localStorage.setItem(KEY, JSON.stringify({ ...state, theme }));
};

export const loadTheme = () => {
  let state = JSON.parse(localStorage.getItem(KEY));
  if (!state || !state.theme) return 'light';
  return state.theme;
};

export const saveClosedTime = (time) => {
  let state = JSON.parse(localStorage.getItem(KEY));
  localStorage.setItem(KEY, JSON.stringify({ ...state, time }));
};

export const loadClosedTime = () => {
  let state = JSON.parse(localStorage.getItem(KEY));
  if (!state || !state.time) return 1;
  return state.time;
};
