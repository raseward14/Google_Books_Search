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
  const [appReadCount, setAppReadCount] = useState(0);
  const [appWantCount, setAppWantCount] = useState(0);
  const [appFavCount, setAppFavCount] = useState(0);

  const callRead = (value) => {
    setAppReadCount(value)
  };

  const callWant = (value) => {
    setAppWantCount(value)
  };

  const callFav = (value) => {
    setAppFavCount(value)
  };

  useEffect(() => {
    console.log('app read count from useEffect', appReadCount)
  }, [appReadCount]);

  useEffect(() => {
    console.log('app want count from useEffect', appWantCount)
  }, [appWantCount]);

  useEffect(() => {
    console.log('app fav count from useEffect: ', appFavCount)
  }, [appFavCount]);

  return (
    <Routes>
      <Route path='/' element={<Layout
        fCount={appFavCount}
        rCount={appReadCount}
        wCount={appWantCount} />}>
        {/* public routes */}
        <Route index element={<RegisterPage />} />
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
