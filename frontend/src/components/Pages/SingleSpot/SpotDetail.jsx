import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SpotDetail.css';
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { getReviewsThunk, getSingleSpotThunk } from "../../../store/spots";
import OpenModalButton from "../../Modals/OpenModalButton/OpenModalButton";
import PostReviewModal from "../../Modals/PostReviewModal/PostReviewModal";


const SingleSpot = () => {
  const dispatch = useDispatch();
  //
  const { id } = useParams();


  const spot = useSelector((state) => state.spots.byId[id]);
  const reviews = useSelector((state) => state.spots.reviews);
  const sessionUser = useSelector((state) => state.session.user)
  const spotId = id;




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

    let previewSpotImg;
    let spotImg = []
    for (const [key, value] of Object.entries(spot.SpotImages)) {
      if (spot.SpotImages[key].preview === true) {
        previewSpotImg = spot.SpotImages[key].url;
      } else {
        spotImg.push(value);
      }
    }

    const stars = spot.avgStarRating

    let reviewPlural = "reviews";
    if (spot.numReviews === 1) {
      reviewPlural = "review"
    } else if (spot.numReviews === 0) {
      spot.numReviews = "";
      reviewPlural = "New";
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

            <div className="middle-section">
              <div className="hosted-by">

              <h1>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h1>

              <p>{spot.description}</p>
              </div>



            <div className="price-reviews">
              <h1>{`$${spot.price}`}</h1><p>night</p>
              <p>★{stars} - {spot.numReviews} {reviewPlural}</p>
              <button onClick={() => {
                alert("Feature Coming Soon...");
              }}>Reserve</button>
            </div>
            </div>

          </div>
          <div className="review-section">
            <h1>★ {stars} - {spot.numReviews} {reviewPlural}</h1>

            <div className="post-review-button">


            {sessionUser && (
                   <OpenModalButton
                   itemText="Post Your Review"
                   modalComponent={<PostReviewModal spotId={spotId}/>}
                     />
            )}



              </div>

            <ul>
              {reviews.map(reviews =>
                <li key={reviews.id}>
                  <ReviewCard reviews={reviews} />
                </li>
              )}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default SingleSpot;
