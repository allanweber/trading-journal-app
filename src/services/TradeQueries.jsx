import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccessTokenState } from '../context/UserContext';
import {
  aggregateTime,
  aggregateTrades,
  closeTrade,
  getOpenTradesCount,
  getSymbols,
  saveTrade,
} from './Trade';

export const useGetOpenTradesCount = (journalId) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [`entries-open-count-${journalId}`],
    async () => await getOpenTradesCount(accessToken, journalId)
  );
};

export const useGetSymbols = (journalId) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [`entries-symbols-${journalId}`],
    async () => await getSymbols(accessToken, journalId),
    {
      cacheTime: 50000,
      staleTime: 40000,
    }
  );
};

export const useSaveTrade = (journalId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (trade) => saveTrade(accessToken, journalId, trade, trade.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`entries-open-count-${journalId}`]);
        queryClient.invalidateQueries([`entries-symbols-${journalId}`]);
        queryClient.invalidateQueries([`entries-${journalId}`]);
        queryClient.invalidateQueries([`journals-balance-${journalId}`]);
      },
    }
  );
};

export const useCloseTrade = (journalId, tradeId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (close) => closeTrade(accessToken, journalId, close, tradeId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`entries-open-count-${journalId}`]);
        queryClient.invalidateQueries([`entries-symbols-${journalId}`]);
        queryClient.invalidateQueries([`entries-${journalId}`]);
        queryClient.invalidateQueries([`journals-balance-${journalId}`]);
      },
    }
  );
};

export const useAggregateTime = (journalId, aggregation, page, size) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [
      `entries-aggregate-time-${journalId}`,
      `entries-aggregate-time-${journalId}-${aggregation}-${page}`,
    ],
    async () =>
      await aggregateTime(accessToken, journalId, aggregation, page, size)
  );
};

export const useAggregateTrades = (journalId, from, until, aggregation) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [
      `entries-aggregate-trades-${journalId}`,
      `entries-aggregate-trades-${journalId}-${from}-${until}-${aggregation}`,
    ],
    async () =>
      await aggregateTrades(accessToken, journalId, from, until, aggregation)
  );
};
