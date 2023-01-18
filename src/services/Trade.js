import { config } from '../utilities/config';
import { apiFormat } from '../utilities/dateTimeUtilities';
import { readErrors } from './readErrors';

export const getOpenTradesCount = (accessToken, journalId) => {
  return fetch(`${config.entries}/journals/${journalId}/entries/trade/open`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then(responseOrError);
};

export const getSymbols = (accessToken, journalId) => {
  return fetch(
    `${config.entries}/journals/${journalId}/entries/trade/symbols`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  ).then(responseOrError);
};

export const saveTrade = (accessToken, journalId, trade, tradeId) => {
  let url = `${config.entries}/journals/${journalId}/entries/trade`;
  let method = 'POST';
  if (tradeId) {
    url += `/${tradeId}`;
    method = 'PATCH';
  }

  return fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...trade,
      date: apiFormat(trade.date),
    }),
  }).then(responseOrError);
};

export const closeTrade = (accessToken, journalId, close, tradeId) => {
  let url = `${config.entries}/journals/${journalId}/entries/trade/${tradeId}/close`;
  return fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...close,
      exitDate: apiFormat(close.exitDate),
    }),
  }).then(responseOrError);
};

export const aggregateTime = (
  accessToken,
  journalId,
  aggregation,
  page,
  size
) => {
  let url = `${config.entries}/journals/${journalId}/entries/trade/aggregate/time?aggregation=${aggregation}`;
  if (page) {
    url += `page=${page}&`;
  }
  if (size) {
    url += `size=${size}&`;
  }

  return fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then(responseOrError);
};

const responseOrError = async (response) => {
  if (response.ok) return response.json();
  else {
    const errors = await readErrors(response);
    throw new Error(errors);
  }
};
