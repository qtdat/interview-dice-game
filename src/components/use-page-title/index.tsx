import { useEffect, useMemo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

import { extractTitles } from '@/configs/routes.jsx';

const usePageTitle = ({ prefix = import.meta.env.VITE_APP_TITLE } = {}) => {
  const location = useLocation();
  const titles = useMemo(() => extractTitles(), []);

  // on mount
  useEffect(() => {
    const found = titles.find(({ path }) => {
      return matchPath(path, location.pathname);
    });
    const title = found ? found.title || 'Page' : import.meta.env.VITE_APP_TITLE;

    // eslint-disable-next-line no-undef
    document.title = prefix ? `${prefix} - ${title}` : title;
  }, [location]);
};

export default usePageTitle;
