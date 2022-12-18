import { createContext, useContext, useState } from 'react';

const JournalContext = createContext();

function JournalProvider({ children }) {
  const [journal, setJournal] = useState();

  const value = {
    journal,
    setJournal,
  };

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  );
}

const useJournalContext = () => useContext(JournalContext);

export { JournalProvider, JournalContext, useJournalContext };
