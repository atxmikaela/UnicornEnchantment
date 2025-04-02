import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addReviewThunk from '../../store';






function ReviewModal({ onClose, errorMessage, cornholeId }) {


const modalContentRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      onClose();
  }
};

document.addEventListener('mousedown', handleClickOutside);

return () => {
  document.removeEventListener('mousedown', handleClickOutside);
};
}, [onClose]);

  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(0);

  const userId = useSelector((state) => state.session.user.id);

  const handleSubmit = (e) => {
    e.preventDefault();




    if (!userId) {
      console.error('userId is undefined! Cannot submit review.');
      return;
    }



    let reviewData = {
      cornholeId: parseInt(cornholeId, 10),
      userId,
      stars,
      review: reviewText,
    };




    console.log('ReviewModal: Data to be dispatched:', reviewData);
    dispatch(addReviewThunk(reviewData))
    .then(() => {
    onClose();
    })
    .catch(async (error) => {
    try {
    const data = await error.json();
    if (data && data.message === 'Review already exists for this spot') {
    console.log(data.message);
    } else {
    console.error('Error submitting review:', data);
    }
   } catch (parseError) {
    console.error('Error parsing error response:', parseError);
   }
  });
 };


  return (<div className="modal-overlay">
    <div className="modal-content review-modal" ref={modalContentRef}>
      <h2>How was your stay?</h2>
      {errorMessage && (
        <p className="modal-message">{errorMessage}</p>
      )}
      <textarea placeholder="Just a quick review."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)} />
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={starValue}
              onClick={() => setStars(starValue)}
              className={starValue <= stars ? 'active' : ''}
            >
              ★
            </span>
          );
        })}
        <span>Stars</span>
      </div>
      <button
        className="submit-review-button"
        onClick={handleSubmit}
        disabled={reviewText.length < 10 || stars < 1}
      >
        Submit Your Review
      </button>

    </div>
  </div>
  );
}


export default ReviewModal;
