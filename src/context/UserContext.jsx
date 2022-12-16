import { createContext, useContext, useReducer } from 'react';
import { signIn } from '../services/Authentication';

const initialState = {
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
  //Add retrieve from local storage
  if (!accessToken) throw new Error('No access token found');
  return accessToken;
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (!context) throw new Error('No context found to dispatch');
  return context;
}

function AuthProvider({ children }) {
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
  } catch (error) {
    console.log(error);
    dispatch({ status: 'rejected', error: error.message });
  }
}

function doLogout(dispatch) {
  dispatch(initialState);
}

export {
  AuthProvider,
  useAuthState,
  useAccessTokenState,
  useAuthDispatch,
  doLogin,
  doLogout,
};
