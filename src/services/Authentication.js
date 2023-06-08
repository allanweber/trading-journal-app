import { config } from '../utilities/config';
import { readErrors } from './readErrors';

export const signIn = (email, password) => {
  return fetch(`${config.authentication}/auth/signin`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
      mode: 'no-cors',
    },
  }).then(async (response) => {
    if (response.ok) return response.json();
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

export const signUp = (register) => {
  return fetch(`${config.authentication}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(register),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) return response.json();
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

export const verify = (hash) => {
  return fetch(`${config.authentication}/auth/verify?hash=${hash}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

export const sendVerification = (email) => {
  return fetch(`${config.authentication}/auth/verify/send?email=${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

export const requestChangePassword = (email) => {
  return fetch(
    `${config.authentication}/auth/change-password/request?email=${email}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

export const changePassword = (request) => {
  return fetch(`${config.authentication}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  }).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};
