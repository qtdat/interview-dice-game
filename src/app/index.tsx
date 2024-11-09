import { Outlet } from 'react-router-dom';
import usePageTitle from '@/components/use-page-title';

import AppContext from '@/libs/context/app-context';

const theme = {
  bodyBg: '#000000',
};

const RootApp = () => {
  // update page title
  usePageTitle();

  return (
    <AppContext.Provider value={{ theme }}>
      <Outlet />
    </AppContext.Provider>
  );
};

export default RootApp;
