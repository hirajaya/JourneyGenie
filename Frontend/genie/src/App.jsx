import "./App.css";
import ReviewsPage from "./pages/ReviewPage.jsx";
import PaymentPage from './pages/PaymentPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/payment/:id" element={<PaymentPage />} />
        {/*<Route path="/home" element={<HomePage />} />*/}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;

