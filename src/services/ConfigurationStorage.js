const KEY = 'CONFIG';

export const saveTheme = (theme) => {
  let state = JSON.parse(localStorage.getItem(KEY));
  localStorage.setItem(KEY, JSON.stringify({ ...state, theme }));
};

export const loadTheme = () => {
  let state = JSON.parse(localStorage.getItem(KEY));
  if (!state) return 'light';
  return state.theme;
};
