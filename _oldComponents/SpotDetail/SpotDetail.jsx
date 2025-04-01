import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk } from "../../store/spot";
import { getReviewsThunk, deleteReviewThunk } from '../../store/reviews';
import ReviewModal from '../ReviewModal';
import './SpotDetail.css';


const SpotDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => (state.spotReducer.byId ? state.spotReducer.byId[id] : null));
    const reviews = useSelector((state) => state.reviewsReducer.byId);
    ("Reviews:", reviews);
    const allReviews = useSelector((state) => state.reviewsReducer.allReviews);
    const sessionUser = useSelector((state) => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [detailImages, setDetailImages] = useState([]);
    const [userCanReview, setUserCanReview] = useState(false);
    const [showModal, setShowModal] = useState(false);





    useEffect(() => {
        const getSpot = async () => {
            await dispatch(getSpotThunk(id));
            setIsLoaded(true);
        };
        const getReviews = async () => {
            await dispatch(getReviewsThunk(id));
        }

        if (!isLoaded) {
            getSpot();
            getReviews();
        }
    }, [dispatch, id, isLoaded]);


    const timestampToMonthYear = useCallback((timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }, []);


    const ratingCheck = useCallback((avgRating) => {
        return avgRating !== null ? `★${spot.avgStarRating} - ${spot.numReviews} reviews` : "New";
    }, [spot]);


    const openModal = () => {
        setShowModal(true);
    };


    const closeModal = () => {
        setShowModal(false);
        window.location.reload()
    };




    useEffect(() => {
        if (spot && spot.SpotImages) {
            const foundPreview = spot.SpotImages.find((image) => image.preview === true);
            if (foundPreview) {
                setPreviewUrl(foundPreview.url);
                setDetailImages(spot.SpotImages.filter(image => image.preview === false));
            } else {
                setDetailImages(spot.SpotImages.filter(image => image.preview === false));
            }
        }
    }, [spot]);


    useEffect(() => {
        if (isLoaded && spot && sessionUser && allReviews) {
            const hasReviewed = allReviews.some((review) => review.userId === sessionUser.id);
            const isOwner = spot.ownerId === sessionUser.id;
            setUserCanReview(!isOwner && !hasReviewed);
        }
    }, [isLoaded, spot, sessionUser, allReviews]);



const handleDeleteReview = async (reviews) => {
    if (sessionUser) {
        try {
            await dispatch(deleteReviewThunk(reviews.id));
            await dispatch(getReviewsThunk(id));
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    } else {
        console.error("Session user is null, cannot delete review.");
    }
};




    if (!isLoaded || !spot) {
        return (
            <img
                src="https://media.tenor.com/WRNhKC63kkgAAAAM/loading-buffering.gif"
                style={{ height: "100px" }}
                alt="Loading..."
            />
        );
    }



console.log(reviews, "is this working now?")

    return (
        <div className='spot-detail-page'>
            <div className="spot-detail-page-container">

                <h1>{spot.name}</h1>
                <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
                <div className='spot-detail-main-panels'>
                    <div className='left-panel'>
                        <img src={previewUrl || "default_image_url.jpg"} className="detail-preview-image" alt="Preview" />
                    </div>
                    <div className='right-panel'>
                        {detailImages.map((image) => (
                            <img className="detail-images" key={image.id} src={image.url} alt="Detail" />
                        ))}
                    </div>
                </div>
                <div className='hosted-by'>
                    <div className='hosted-by-left'>
                        <h1>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h1>
                        <p>{spot.description}</p>
                    </div>
                    <span className='price-reviews'>
                        <h1>${spot.price?.toFixed(2)} </h1>
                        <h3>night</h3>
                        <h3>{ratingCheck(spot.avgStarRating)}</h3>
                    </span>
                </div>


                <div className='review-section'>
                    <h2>★{ratingCheck(spot)}</h2>


                    {userCanReview && (
                        <button className="review-button" onClick={openModal}>
                            Post Your Review
                        </button>
                    )}


                    {reviews && Object.values(reviews).length > 0 ? (
                        <div className="ratingsWrapper">

                            {Object.values(reviews)
                                .sort((a, b) => b.id - a.id)
                                .map((review) => (
                                    <div key={review.id} className="review-item">
                                        <h3>{review.User?.firstName}</h3>
                                        <p className="review-date">{timestampToMonthYear(review.createdAt)}</p>
                                        <p className="review-text">{review.review}</p>
                                        {sessionUser && review.userId === sessionUser.id && (
                                            <button
                                            onClick={() => handleDeleteReview(review.id)}
                                            className='delete-review-button'
                                            >Delete Review </button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className='noRatingsWrapper'>
                            <h1>Be the first to post a review</h1>
                        </div>
                    )}
                </div>


                {showModal && (
                    <ReviewModal
                        spotId={id}
                        onClose={closeModal}

                    />
                )}
            </div>
        </div>
    );

}



export default SpotDetail;
