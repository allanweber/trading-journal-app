import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccessTokenState } from '../context/UserContext';
import {
  deleteEntry,
  getEntries,
  saveDeposit,
  saveTaxes,
  saveTrade,
  saveWithdrawal,
} from './Entry';

export const useGetEntries = (journalId) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [`entries-${journalId}`],
    async () => await getEntries(accessToken, journalId)
  );
};

export const useSaveTrade = (journalId, tradeId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (trade) => saveTrade(accessToken, journalId, trade, tradeId),
    {
      onSuccess: refreshQueries(queryClient, journalId),
    }
  );
};

export const useSaveDeposit = (journalId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (deposit) => saveDeposit(accessToken, journalId, deposit),
    {
      onSuccess: refreshQueries(queryClient, journalId),
    }
  );
};

export const useSaveWithdrawal = (journalId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (withdrawal) => saveWithdrawal(accessToken, journalId, withdrawal),
    {
      onSuccess: refreshQueries(queryClient, journalId),
    }
  );
};

export const useSaveTaxes = (journalId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation((taxes) => saveTaxes(accessToken, journalId, taxes), {
    onSuccess: refreshQueries(queryClient, journalId),
  });
};

export const useDeleteEntry = (journalId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (entryId) => deleteEntry(accessToken, journalId, entryId),
    {
      onSuccess: refreshQueries(queryClient, journalId),
    }
  );
};

const refreshQueries = (queryClient, journalId) => {
  queryClient.invalidateQueries([`entries-${journalId}`]);
  queryClient.invalidateQueries([`journals-balance-${journalId}`]);
};
