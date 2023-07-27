
import ErrorPage from './ErrorPage';
import Home from './Home';
import { Layout } from './Layout';
import { Categories } from './categories/Categories';
import AllArtworks from './galleryViews/AllArtworks';
import GroupArtworks from './galleryViews/GroupArtworks';
import RecentArtworks from './galleryViews/RecentArtworks';
import SearchArtworks from './galleryViews/SearchArtworks';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Layout/>,
    // loader: dataLoader,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/categories",
        element: <Categories/>
      },
      {
        path: "/all",
        element: <AllArtworks/>
      },
      {
        path: "/recent",
        element: <RecentArtworks/>
      },
      {
        path: "/group/:group",
        element: <GroupArtworks/>
      },
      {
        path: "/search",
        element: <SearchArtworks/>
      },
    ] 
  }
])

export default function AppRoutes2() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}