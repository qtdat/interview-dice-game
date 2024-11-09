import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider as ReactQueryProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import type { Preview } from '@storybook/react';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto-mono';

import '@/libs/i18n-provider';
import store from '@/store';
import MuiThemeRegister from '@/libs/mui-theme-register';
import '@/main.css';

const oReactQuery = new QueryClient();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, { title }) => {
      const myReg = /^(demo|libraries)/i
      const isMatch = myReg.exec(title);

      if (isMatch) {
        return (
          <ReduxProvider store={store}>
            <ReactQueryProvider client={oReactQuery}>
              <MuiThemeRegister>
                <MemoryRouter initialEntries={['/']}>
                  <Story />
                </MemoryRouter>
              </MuiThemeRegister>
            </ReactQueryProvider>
          </ReduxProvider>
        );
      }

      return <Story />
    },
  ],
};

export default preview;
