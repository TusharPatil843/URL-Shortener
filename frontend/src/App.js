import { Routes, Route } from 'react-router-dom';
import UrlShortenerForm from './components/Urlshortenerform';
import AdminPage from './AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UrlShortenerForm />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
