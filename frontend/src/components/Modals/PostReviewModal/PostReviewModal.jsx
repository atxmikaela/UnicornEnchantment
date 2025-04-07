import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import '../Modal.css';
import { addReviewThunk } from '../../../store/spots';





const PostReviewModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disabledButton, disableButton] = useState(true);



  useEffect(() => {
    disableButton(stars < 1 || stars > 5 || review.length < 10);
  }, [stars, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const reviewData = {
      review,
      stars,
      spotId,
    }

    await dispatch(addReviewThunk(reviewData))
    reset();
    closeModal();

  };

    const reset = () => {
      setReview('');
      setStars('');
    }




  return (
    <>
    <div className='review-modal-wrapper'>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <label>
           <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder='Leave your review here...'
            required
          />
        </label>
        {errors.review && <p>{errors.review}</p>}
        <label>
          <input
            type="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>
          Stars
        {errors.stars && <p>{errors.stars}</p>}
        <button type="submit" disabled={disabledButton}></button>
      </form>
      </div>
    </>
  );
}

export default PostReviewModal;
