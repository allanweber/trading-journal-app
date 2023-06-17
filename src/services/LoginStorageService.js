const KEY = 'TOKEN';

export const setToken = (token) => {
  sessionStorage.setItem(KEY, JSON.stringify(token));
};

export const getToken = () => {
  return JSON.parse(sessionStorage.getItem(KEY));
};

export const hasToken = () => {
  return !!getToken();
};

export const removeToken = () => {
  sessionStorage.removeItem(KEY);
};
