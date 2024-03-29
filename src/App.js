import { CssBaseline, ThemeProvider } from '@mui/material/';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import ConfirmationModalContextProvider from './components/dialog/Confirmation';
import ToastrContextProvider from './components/toastr/Toastr';
import { JournalProvider } from './context/JournalContext';
import { AuthProvider } from './context/UserContext';
import { Routes } from './routes/Routes';
import { NavBar } from './routes/header/navbar';
import { removeToken } from './services/LoginStorageService';
import { ColorModeContext, useMode } from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.message === 401 || error.message === '401') {
        removeToken();
        window.location.href = '/login';
      }
    },
  }),
});

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ConfirmationModalContextProvider>
              <ToastrContextProvider>
                <div className="app">
                  <main className="content">
                    <JournalProvider>
                      <NavBar />
                      <Routes />
                    </JournalProvider>
                  </main>
                </div>
              </ToastrContextProvider>
            </ConfirmationModalContextProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
