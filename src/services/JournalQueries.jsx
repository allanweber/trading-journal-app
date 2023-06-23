import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccessTokenState } from '../context/UserContext';
import {
  deleteJournal,
  getBalance,
  getJournal,
  getJournals,
  saveJournal,
} from './Journal';

export const useGetJournals = () => {
  const accessToken = useAccessTokenState();
  return useQuery(['journals'], async () => await getJournals(accessToken));
};

export const useGetJournal = (journalId) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [`journals-${journalId}`],
    async () => await getJournal(accessToken, journalId)
  );
};

export const useGetBalance = (journalId) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [`journals-balance-${journalId}`],
    async () => await getBalance(accessToken, journalId),
    { enabled: !!journalId }
  );
};

export const useSaveJournal = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation((journal) => saveJournal(accessToken, journal), {
    onSuccess: (journal) => {
      queryClient.invalidateQueries(['journals']);
      queryClient.invalidateQueries([`journals-${journal.id}`]);
      queryClient.invalidateQueries([`journals-balance-${journal.id}`]);
    },
  });
};

export const useDeleteJournal = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation((journalId) => deleteJournal(accessToken, journalId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['journals']);
    },
  });
};
