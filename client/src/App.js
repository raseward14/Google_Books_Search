import Layout from './components/Layout/layout';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import WantToReadPage from './pages/WantToReadPage';
import LibraryPage from './pages/LibraryPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';

import {
  Routes,
  Route
} from 'react-router-dom'

import React, { useEffect, useState } from 'react';

function App() {
  const [appReadCount, setAppReadCount] = useState(null);
  const [appWantCount, setAppWantCount] = useState(null);
  const [appFavCount, setAppFavCount] = useState(null);

  const callRead = (value) => {
    if(value !== null && value !== appReadCount) {
    setAppReadCount(value)
    }
  };

  const callWant = (value) => {
    if(value !== null && value !== appWantCount) {
      setAppWantCount(value)
    }
  };

  const callFav = (value) => {
    if(value !== null && value !== appFavCount) {
      setAppFavCount(value)
    }
  };

  useEffect(() => {
    console.log('app.js read: ', appReadCount)
  }, [appReadCount]);

  useEffect(() => {
    console.log('app.js want: ', appWantCount)
  }, [appWantCount]);

  useEffect(() => {
    console.log('app.js fav: ', appFavCount)
  }, [appFavCount]);

  return (
      <Routes>
        <Route path='/' element={<Layout
          fCount={appFavCount}
          rCount={appReadCount}
          wCount={appWantCount} />}>
          {/* public routes */}
          <Route index element={<RegisterPage
            appReadCount={callRead}
            appFavCount={callFav}
            appWantCount={callWant} />} />
          <Route path='login' element={<LoginPage />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth />}>
            <Route path='search' element={<SearchPage
              appReadCount={callRead}
              appWantCount={callWant}
              appFavCount={callFav} />} />
            <Route path='read' element={<WantToReadPage
              appReadCount={callRead}
              appFavCount={callFav}
              appWantCount={callWant} />} />
            <Route path='library' element={<LibraryPage
              appReadCount={callRead}
              appWantCount={callWant}
              appFavCount={callFav} />} />
            <Route path='favorites' element={<FavoritesPage
              appReadCount={callRead}
              appWantCount={callWant}
              appFavCount={callFav} />} />
          </Route>

          {/* catch all */}
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
  );
}

export default App;
