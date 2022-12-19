import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import ConfirmationModalContextProvider from './components/dialog/Confirmation';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { JournalProvider } from './context/JournalContext';
import { AuthProvider } from './context/UserContext';
import { Dashboard } from './pages/dashboard';
import { NavBar } from './pages/global/navbar';
import { Journals } from './pages/journals/Journals';
import { ChangePassword } from './pages/password/ChangePassword';
import { RequestPassword } from './pages/password/RequestPassword';
import { SignIn } from './pages/signin';
import { SignUp } from './pages/signup';
import { AllEntries } from './pages/trades/AllEntries';
import { Calendar } from './pages/trades/Calendar';
import { Trades } from './pages/trades/Trades';
import { VerifyEmail } from './pages/verify';
import { ColorModeContext, useMode } from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.message === 'Unauthorized') {
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
              <div className="app">
                <main className="content">
                  <JournalProvider>
                    <NavBar />
                    <Routes>
                      <Route path="/login" element={<SignIn />} />
                      <Route path="/register" element={<SignUp />} />
                      <Route path="/email-verified" element={<VerifyEmail />} />
                      <Route
                        path="/forgot-password"
                        element={<RequestPassword />}
                      />
                      <Route
                        path="/change-password"
                        element={<ChangePassword />}
                      />
                      <Route path="/" element={<PrivateRoute />}>
                        <Route path="" element={<Dashboard />} />
                      </Route>
                      <Route path="/journals" element={<PrivateRoute />}>
                        <Route path="" element={<Journals />} />
                      </Route>
                      <Route path="/trades" element={<PrivateRoute />}>
                        <Route path="" element={<Trades />} />
                      </Route>
                      <Route path="/entries" element={<PrivateRoute />}>
                        <Route path="" element={<AllEntries />} />
                      </Route>
                      <Route path="/calendar" element={<PrivateRoute />}>
                        <Route path="" element={<Calendar />} />
                      </Route>
                    </Routes>
                  </JournalProvider>
                </main>
              </div>
            </ConfirmationModalContextProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
