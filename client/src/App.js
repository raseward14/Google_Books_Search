import Layout from './components/Layout/layout';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import WantToReadPage from './pages/WantToReadPage';
import LibraryPage from './pages/LibraryPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

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
          <Route index element={<RegisterPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='read' element={<WantToReadPage />} />
          <Route path='library' element={<LibraryPage />} />
          <Route path='favorites' element={<FavoritesPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
