import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import ConfirmationModalContextProvider from './components/dialog/Confirmation';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { AuthProvider } from './context/UserContext';
import { Dashboard } from './pages/dashboard';
import { Sidebar } from './pages/global/sidebar';
import { TopBar } from './pages/global/topbar';
import { Journal } from './pages/journals/Journal';
import { Journals } from './pages/journals/Journals';
import { ChangePassword } from './pages/password/ChangePassword';
import { RequestPassword } from './pages/password/RequestPassword';
import { SignIn } from './pages/signin';
import { SignUp } from './pages/signup';
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
                <Sidebar />
                <main className="content">
                  <TopBar />
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
                      <Route path=":journalId" element={<Journal />} />
                    </Route>
                  </Routes>
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
