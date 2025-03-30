import { useParams } from 'react-router-dom';
import './SpotDetail.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk } from "../../store/spot";
import { getReviewsThunk } from '../../store/reviews';

const SpotDetail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spotReducer.byId ? state.spotReducer.byId[id] : null);
    const reviews = useSelector((state) => state.reviewsReducer.byId);
    ("Reviews:", reviews);
    const [isLoaded, setIsLoaded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [detailImages, setDetailImages] = useState([]);

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

    function timestampToMonthYear(timestamp) {
      const date = new Date(timestamp);
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];
      const monthName = monthNames[monthIndex];
      const formattedDate = `${monthName} ${year}`;
      return formattedDate;
  }

    function ratingCheck (avgRating) {
        if (avgRating !== null) {
            return `star ${spot.avgStarRating.toFixed(1)} - ${spot.numReviews} reviews`;
        } return "No Reviews Yet";
    }

    if (!isLoaded || !spot) {
        return (
            <img
                src="https://media.tenor.com/WRNhKC63kkgAAAAM/loading-buffering.gif"
                style={{ height: "100px" }}
                alt="Loading..."
            />
        );
    } else {
        return (
            <div className='spot-detail-page'>
                <div className='spot-detail-page-container'>
                    <h1>{spot.name}</h1>
                    <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
                    <div className='spot-detail-main-panels'>
                        <div className='left-panel'>
                            <img src={previewUrl} className="detail-preview-image" alt="Preview" />
                        </div>
                        <div className='right-panel'>
                            {detailImages.map((image) => (
                                <img className="detail-images" key={image.id} src={image.url} alt="Detail" />
                            ))}
                        </div>
                    </div>
                    <div className='hosted-by'>
                        <div className='hosted-by-left'>
                            <h1>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
                            <p>{spot.description}</p>
                        </div>
                        <span className='price-reviews'>
                            <h1>${spot.price.toFixed(2)} </h1>
                            <h3>night</h3>
                            <h3>{ratingCheck(spot.avgStarRating)}</h3>
                        </span>
                    </div>
                    <h1>{ratingCheck(spot.avgStarRating)}</h1>
                    {}
                    {reviews && Object.values(reviews).map((review) => (
                        <div key={review.id}>
                            <h3>{review.User.firstName}</h3>
                            <p>{timestampToMonthYear(review.createdAt)}</p>
                            <p>{review.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default SpotDetail;
