import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Layout from './components/Layout/layout';
import HomePage
function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={} />

          </Route>
        </Routes>
    </Router>
  );
}

export default App;
