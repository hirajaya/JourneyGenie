import "./App.css";
import ReviewForm from "./pages/ReviewForm.jsx";
import ReviewList from "./pages/ReviewList.jsx";

const App = () => {
  const packageId = "456xyz";
  
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-5">Tour Guide Reviews</h1>
      <ReviewForm packageId={packageId} onReviewAdded={() => {}} />
      <ReviewList packageId={packageId} />
    </div>
  );
};

export default App;
