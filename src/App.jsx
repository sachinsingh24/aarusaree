import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

// Home loads eagerly (first paint); other pages are code-split.
const About = lazy(() => import('./pages/About'));
const Collections = lazy(() => import('./pages/Collections'));
const CollectionDetail = lazy(() => import('./pages/CollectionDetail'));
const Catalogue = lazy(() => import('./pages/Catalogue'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    // If the header or footer itself fails, the error page shows on its own.
    errorElement: <ErrorPage standalone />,
    children: [
      {
        // A page that fails to load or crashes shows the error page between the header and footer.
        errorElement: <ErrorPage />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/about', element: <About /> },
          { path: '/collections', element: <Collections /> },
          { path: '/collections/:slug', element: <CollectionDetail /> },
          { path: '/sarees', element: <Catalogue /> },
          { path: '/sarees/:id', element: <ProductDetail /> },
          { path: '/gallery', element: <Gallery /> },
          { path: '/contact', element: <Contact /> },
          { path: '/privacy-policy', element: <Legal type='privacy' /> },
          { path: '/terms', element: <Legal type='terms' /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
