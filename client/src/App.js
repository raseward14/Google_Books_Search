import Layout from './components/Layout/layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ReadPage from './pages/ReadPage';
import LibraryPage from './pages/LibraryPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { useState, useEffect, useNavigate } from 'react';

function App() {

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = ([]);
  // const navigate = useNavigate();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout
          search={search}
          setSearch={setSearch}
        />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage books={searchResults} />} />
          <Route path='read' element={<ReadPage />} />
          <Route path='library' element={<LibraryPage />} />
          <Route path='favorites' element={<FavoritesPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
