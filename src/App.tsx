import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, ItineraryView, ConfirmationPage } from './pages';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itinerary/:id/view" element={<ItineraryView />} />
        <Route path="/itinerary/:id/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}