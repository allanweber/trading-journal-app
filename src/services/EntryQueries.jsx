import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccessTokenState } from '../context/UserContext';
import {
  deleteEntry,
  getEntries,
  saveDeposit,
  saveTaxes,
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
