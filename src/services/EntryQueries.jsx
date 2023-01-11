import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccessTokenState } from '../context/UserContext';
import {
  closeTrade,
  deleteEntry,
  getEntries,
  getOpenTradesCount,
  getSymbols,
  saveDeposit,
  saveTaxes,
  saveTrade,
  saveWithdrawal,
} from './Entry';

export const useGetEntries = ({
  journalId,
  status,
  symbol,
  type,
  from,
  direction,
  result,
}) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [
      `entries-${journalId}`,
      `${journalId}-${status}-${symbol}-${type}-${from}-${direction}-${result}`,
    ],
    async () =>
      await getEntries(
        accessToken,
        journalId,
        status,
        symbol,
        type,
        from,
        direction,
        result
      )
  );
};

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

export const useSaveDeposit = (journalId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (deposit) => saveDeposit(accessToken, journalId, deposit),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`entries-${journalId}`]);
        queryClient.invalidateQueries([`journals-balance-${journalId}`]);
      },
    }
  );
};

export const useSaveWithdrawal = (journalId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (withdrawal) => saveWithdrawal(accessToken, journalId, withdrawal),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`entries-${journalId}`]);
        queryClient.invalidateQueries([`journals-balance-${journalId}`]);
      },
    }
  );
};

export const useSaveTaxes = (journalId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation((taxes) => saveTaxes(accessToken, journalId, taxes), {
    onSuccess: () => {
      queryClient.invalidateQueries([`entries-${journalId}`]);
      queryClient.invalidateQueries([`journals-balance-${journalId}`]);
    },
  });
};

export const useDeleteEntry = (journalId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (entryId) => deleteEntry(accessToken, journalId, entryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`entries-${journalId}`]);
        queryClient.invalidateQueries([`journals-balance-${journalId}`]);
      },
    }
  );
};
