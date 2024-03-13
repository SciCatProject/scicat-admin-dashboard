import { GitHubBanner, Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import { ThemeProvider } from '@mui/material/styles';
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  RefineThemes,
} from '@refinedev/mui';
import StorageIcon from '@mui/icons-material/Storage';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { dataProvider } from './utils/dataProvider';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { ColorModeContextProvider } from './contexts/color-mode';
import { DatasetList, DatasetShow } from './pages/datasets';
import { UsersShow, UsersList } from './pages/users';
import { DashboardPage } from './pages/dashboard';

function App() {
  return (
    <ThemeProvider theme={RefineThemes.Red}>
      <BrowserRouter>
        <GitHubBanner />
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
            <RefineSnackbarProvider>
              <DevtoolsProvider>
                <Refine
                  dataProvider={dataProvider}
                  notificationProvider={notificationProvider}
                  routerProvider={routerBindings}
                  resources={[
                    {
                      name: 'dashboard',
                      list: '/',
                      meta: {
                        icon: <DashboardIcon />,
                      },
                    },
                    {
                      name: 'datasets',
                      list: '/datasets',
                      show: '/datasets/:id',
                      meta: {
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
                        <ThemedLayoutV2 Header={() => <Header sticky />}>
                          <Outlet />
                        </ThemedLayoutV2>
                      }
                    >
                      {/* <Route index element={<NavigateToResource resource='datasets' />} /> */}
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
                  </Routes>

                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
              </DevtoolsProvider>
              <DevtoolsPanel />
            </RefineSnackbarProvider>
          </ColorModeContextProvider>
        </RefineKbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
