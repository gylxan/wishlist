import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { AdminPage } from './admin/admin';
import { WishlistPage } from './wishlist/wishlist';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <WishlistPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
];

export const router = createBrowserRouter(routes);
