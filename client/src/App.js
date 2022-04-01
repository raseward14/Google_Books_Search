import Layout from './components/Layout/layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WantToReadPage from './pages/WantToReadPage';
import LibraryPage from './pages/LibraryPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='read' element={<WantToReadPage />} />
          <Route path='library'>
            <Route index element={<LibraryPage />} />
            <Route path='/:id'></Route>
          </Route>
          <Route path='favorites' element={<FavoritesPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
