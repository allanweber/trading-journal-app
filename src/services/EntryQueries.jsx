import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useJournalContext } from '../context/JournalContext';
import { useAccessTokenState } from '../context/UserContext';
import {
  deleteEntry,
  deleteEntryImage,
  getEntries,
  getEntry,
  getEntryImages,
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
  strategies,
  page,
  size,
  sort,
}) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [
      `entries-${journalId}`,
      `${journalId}-${status}-${symbol}-${type}-${from}-${direction}-${result}-${strategies}-${page}-${size}-${sort}`,
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
        result,
        strategies,
        page,
        size,
        sort
      )
  );
};

export const useGetEntry = (journalId, entryId) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [`entry-${journalId}-${entryId}`],
    async () => await getEntry(accessToken, journalId, entryId)
  );
};

export const useGetEntryImages = (entryId) => {
  const accessToken = useAccessTokenState();
  const { journal } = useJournalContext();
  return useQuery(
    [`entry-${entryId}-images`],
    async () => await getEntryImages(accessToken, journal.id, entryId)
  );
};

export const useDeleteEntryImage = (entryId) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  const { journal } = useJournalContext();
  return useMutation(
    (imageId) => deleteEntryImage(accessToken, journal.id, entryId, imageId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`entry-${entryId}-images`]);
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
