import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SpotDetail.css';
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { getReviewsThunk, getSingleSpotThunk } from "../../../store/spots";

const SingleSpot = () => {
  const dispatch = useDispatch();
  //
  const { id } = useParams();


  const spot = useSelector((state) => state.spots.byId[id]);
  const reviews = useSelector((state) => state.spots.reviews);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getSpot = async () => {
      await dispatch(getSingleSpotThunk(id));
      await dispatch(getReviewsThunk(id));
      setIsLoaded(true);
    };

    if (!isLoaded) {
      getSpot();
    }
  }, [dispatch, id, isLoaded]);


  if (!isLoaded || !spot) {
    return (
      <img
        src="https://media.tenor.com/WRNhKC63kkgAAAAM/loading-buffering.gif"
        style={{ height: "100px" }}
        alt="Loading..."
      />
    );
  } else {
    //since data is loaded for sure here since we are rending the else return...
    //create two variables to determine if images are preview or spot images to render in dom.

    let previewSpotImg;
    let spotImg = []
    for (const [key, value] of Object.entries(spot.SpotImages)) {
      if (spot.SpotImages[key].preview === true) {
        previewSpotImg = spot.SpotImages[key].url;
      } else {
        spotImg.push(value);
      }
    }

    return (
      <>

        <div className="spot-detail-page">
          <div className="spot-boxed-page-wrapper">

            <h1>{spot.name}</h1>
            <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>

            <div className="spot-detail-main-panels">

              <div className="left-panel">
                <img src={previewSpotImg} className="detail-preview-image" />
              </div>


              <div className="right-panel">
                {spotImg.map((image, idx) => (
                  <img key={idx} src={image.url} className="detail-images"></img>
                ))}
              </div>
            </div>

            <div className="hosted-by">

              <h1>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h1>
            </div>
            <p>{spot.description}</p>
          </div>
        </div>

        <div className="price-reviews">

          <h1>{`$${spot.price}`}</h1><p>night</p>
          <p>{`${spot.avgStarRating} - ${spot.numReviews} reviews`}</p>
          <button className="reserve-button">Reserve</button>


        </div>

        <div className="review-section">
          <h1>Star {spot.avgStarRating} - {spot.numReviews} Reviews</h1>

          {reviews.map(reviews =>
            <li key={reviews.id}>
              <ReviewCard reviews={reviews} spot={spot} />
            </li>
          )}









        </div>

      </>
    );
  }
}

export default SingleSpot;
