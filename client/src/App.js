import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import NavBar from './components/nav'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
