import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MeetingForm from './Pages/MeetingForm';
import 'remixicon/fonts/remixicon.css';

const App = () => {
  return (
    <Routes>
      <Route index element={<MeetingForm />} />
    </Routes>
  );
}

export default App;
