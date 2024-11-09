import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router'

import RootApp from '@/app/index';
import HomePage from '@/app/HomePage';

const routes = [
  {
    path: '/',
    element: <RootApp />,
    children: [
      {
        path: '',
        element: <HomePage />,
        title: 'Home',
      },
    ],
  },
];

type TitleType = {
  path: string,
  title: string,
};

export function extractTitles(): TitleType[] {
  const arrReturn: TitleType[] = [];

  routes.forEach((route) => {
    const { path, children } = route;

    if (Array.isArray(children) && children.length !== 0) {
      children.forEach((subRoute) => {
        const { path: subPath } = subRoute;

        if ('title' in subRoute) {
          arrReturn.push({ path: `${ path !== '/' ? path: ''}/${subPath}`, title: subRoute['title'] });
        }
      })

      return;
    }

    if ('title' in route) {
      arrReturn.push({ path, title: route.title as string });
    }
  });

  return arrReturn;
}

const appRoutes = createBrowserRouter(routes as RouteObject[]);

export default appRoutes;
