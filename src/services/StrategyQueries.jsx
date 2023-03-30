import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccessTokenState } from '../context/UserContext';
import {
  deleteStrategy,
  getStrategies,
  getStrategy,
  saveStrategy,
} from './Strategies';

export const useGetStrategies = (page, size, sort) => {
  const accessToken = useAccessTokenState();

  return useQuery(
    ['strategies', `strategies-${page}-${size}-${sort}`],
    async () => await getStrategies(accessToken, page, size, sort)
  );
};

export const useGetStrategy = (strategyId) => {
  const accessToken = useAccessTokenState();
  return useQuery(
    [`strategies-${strategyId}`],
    async () => await getStrategy(accessToken, strategyId)
  );
};

export const useSaveStrategy = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation((strategy) => saveStrategy(accessToken, strategy), {
    onSuccess: (strategy) => {
      queryClient.invalidateQueries(['strategies']);
      queryClient.invalidateQueries([`strategies-${strategy.id}`]);
    },
  });
};

export const useDeleteStrategy = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation((strategyId) => deleteStrategy(accessToken, strategyId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['strategies']);
    },
  });
};
