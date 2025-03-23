import { useParams } from 'react-router-dom';
import './SpotDetail.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotThunk } from "../../store/spot";




const SpotDetail = () => {

    const {id} = useParams();


    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spotReducer.byId ? state.spotReducer.byId[id] : null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [detailImages, setDetailImages] = useState([])

    useEffect(() => {
      const getSpot = async () => {
              await dispatch(getSpotThunk(id));
              setIsLoaded(true);
      };

      if (!isLoaded) {
          getSpot();
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


    if (!isLoaded) {
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
          <h3>  star {spot.avgStarRating} - {spot.numReviews} reviews</h3>
          </span>
          </div>
          <h1>star {spot.avgStarRating} - {spot.numReviews} reviews</h1>
          
        </div>
        </div>
    );
}
};

export default SpotDetail;
