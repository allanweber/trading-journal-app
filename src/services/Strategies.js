import { config } from '../utilities/config';
import { readErrors } from './readErrors';

export const saveStrategy = (accessToken, strategy) => {
  return fetch(`${config.entries}/strategies`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(strategy),
  }).then(responseOrError);
};

export const getStrategies = (accessToken) => {
  return fetch(`${config.entries}/strategies`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }).then(responseOrError);
};

export const getStrategy = (accessToken, strategyId) => {
  return fetch(`${config.entries}/strategies/${strategyId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }).then(responseOrError);
};

export const deleteStrategy = (accessToken, strategyId) => {
  return fetch(`${config.entries}/strategies/${strategyId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

const responseOrError = async (response) => {
  if (response.ok) return response.json();
  else {
    const errors = await readErrors(response);
    throw new Error(errors);
  }
};
