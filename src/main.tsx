import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider as ReactQueryProvider } from '@tanstack/react-query';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto-mono';

import '@/libs/i18n-provider';
import store from './store';
import routes from '@/configs/routes';
import MuiThemeRegister from '@/libs/mui-theme-register';
import './main.css';

const oReactQuery = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <ReactQueryProvider client={oReactQuery}>
      <MuiThemeRegister>
        <RouterProvider router={routes} />
      </MuiThemeRegister>
    </ReactQueryProvider>
  </ReduxProvider>
);