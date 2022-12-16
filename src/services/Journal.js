import { config } from '../utilities/config';
import { apiFormat } from '../utilities/dateTimeUtilities';
import { readErrors } from './readErrors';

export const saveJournal = (accessToken, journal) => {
  return fetch(`${config.entries}/journals`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...journal,
      startJournal: apiFormat(journal.startJournal),
    }),
  }).then(responseOrError);
};

export const getJournals = (accessToken) => {
  return fetch(`${config.entries}/journals`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }).then(responseOrError);
};

export const getJournal = (accessToken, journalId) => {
  return fetch(`${config.entries}/journals/${journalId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }).then(responseOrError);
};

export const getBalance = (accessToken, journalId) => {
  return fetch(`${config.entries}/journals/${journalId}/balance`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }).then(responseOrError);
};

export const deleteJournal = (accessToken, journalId) => {
  return fetch(`${config.entries}/journals/${journalId}`, {
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
