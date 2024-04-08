import { Authenticated, GitHubBanner, Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';

import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import { ThemeProvider } from '@mui/material/styles';
import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  RefineThemes,
  useNotificationProvider,
  ThemedTitleV2,
} from '@refinedev/mui';

import { AuthPage } from './components/auth';
import StorageIcon from '@mui/icons-material/Storage';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { ColorModeContextProvider } from './contexts/color-mode';
import { DatasetList, DatasetShow } from './pages/datasets';
import { UsersShow, UsersList } from './pages/users';
import { DashboardPage } from './pages/dashboard';
import { authProvider } from './providers/auth/authProvider';
import { datasetsProvider } from './providers/datasets/datasetsProvider';

function App() {
  return (
    <ThemeProvider theme={RefineThemes.Red}>
      <BrowserRouter>
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
            <RefineSnackbarProvider>
              {/* <DevtoolsProvider> */}
              <Refine
                dataProvider={{
                  default: datasetsProvider,
                  datasets: datasetsProvider,
                }}
                notificationProvider={useNotificationProvider}
                authProvider={authProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: 'dashboard',
                    list: '/',
                    meta: {
                      dataProviderName: 'datasets',
                      icon: <DashboardIcon />,
                    },
                  },
                  {
                    name: 'datasets',
                    list: '/datasets',
                    show: '/datasets/:id',
                    meta: {
                      dataProviderName: 'datasets',
                      icon: <StorageIcon />,
                    },
                  },
                  {
                    name: 'users',
                    list: '/users',
                    show: '/users/:id',
                    meta: {
                      icon: <PeopleIcon />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: 'NHns4W-lgQwjS-rwQfvI',
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key='authenticated-inner'
                        fallback={<CatchAllNavigate to='/login' />}
                      >
                        <ThemedLayoutV2
                          Title={({ collapsed }) => (
                            <ThemedTitleV2
                              collapsed={collapsed}
                              icon={<HomeIcon />}
                              text='Scicat Admin'
                            />
                          )}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route index element={<DashboardPage />} />
                    <Route path='/datasets'>
                      <Route index element={<DatasetList />} />
                      <Route path='/datasets/:id' element={<DatasetShow />} />
                    </Route>
                    <Route path='/users'>
                      <Route index element={<UsersList />} />
                      <Route path='/users/:id' element={<UsersShow />} />
                    </Route>
                    <Route path='*' element={<ErrorComponent />} />
                  </Route>

                  <Route
                    element={
                      <Authenticated key='authenticated-outer' fallback={<Outlet />}>
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path='/login'
                      element={
                        <AuthPage
                          type='login'
                          formProps={{
                            defaultValues: {
                              username: '',
                              password: '',
                            },
                          }}
                          title={<h1>Scicat Admin</h1>}
                          registerLink={false}
                          forgotPasswordLink={false}
                        />
                      }
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* </DevtoolsProvider> */}
              {/* <DevtoolsPanel /> */}
            </RefineSnackbarProvider>
          </ColorModeContextProvider>
        </RefineKbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
