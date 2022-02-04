import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Layout from './components/Layout/layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ReadPage from './pages/ReadPage';
import LibraryPage from './pages/LibraryPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
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
