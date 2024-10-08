import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
}

export default App;
