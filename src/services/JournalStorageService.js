import { getItem, setItem } from './LocalStorageService';

const KEY = 'CURRENT_JOURNAL';

export const setCurrentJournal = (journal) => {
  setItem(KEY, journal);
};

export const getCurrentJournal = () => {
  return getItem(KEY);
};
