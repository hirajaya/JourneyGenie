import ReviewForm from "./ReviewForm.jsx";
import ReviewList from "./ReviewList.jsx";

const ReviewsPage = ({ packageId }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <ReviewForm packageId={packageId} onReviewAdded={() => window.location.reload()} />
      <div className="mt-6">
        <ReviewList packageId={packageId} />
      </div>
    </div>
  );
};

export default ReviewsPage;
