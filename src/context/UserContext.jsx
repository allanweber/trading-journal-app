import { createContext, useContext, useReducer } from 'react';
import { signIn } from '../services/Authentication';
import {
  getToken,
  hasToken,
  removeToken,
  setToken,
} from '../services/LoginStorageService';

let initialState = {
  status: 'idle',
  user: undefined,
  error: null,
};

const AuthStateContext = createContext(initialState);
const AuthDispatchContext = createContext({});

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) throw new Error('No context found');

  return context;
}

function useAccessTokenState() {
  const context = useContext(AuthStateContext);
  const { user: { accessToken } = {} } = context;
  if (!accessToken) throw new Error('No access token found');
  return accessToken;
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (!context) throw new Error('No context found to dispatch');
  return context;
}

function AuthProvider({ children }) {
  if (hasToken()) {
    const token = getToken();
    initialState = {
      status: 'resolved',
      user: token,
      error: null,
    };
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

async function doLogin(dispatch, email, password) {
  try {
    dispatch({ status: 'pending' });
    const result = await signIn(email, password);
    dispatch({
      status: 'resolved',
      user: result,
      error: null,
    });
    setToken(result);
  } catch (error) {
    dispatch({ status: 'rejected', error: error.message });
  }
}

function doLogout(dispatch) {
  removeToken();
  dispatch(initialState);
  window.location.href = '/login';
}

export {
  AuthProvider,
  doLogin,
  doLogout,
  useAccessTokenState,
  useAuthDispatch,
  useAuthState,
};
