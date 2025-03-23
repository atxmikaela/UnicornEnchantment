import { useParams } from 'react-router-dom';
import './SpotDetail.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsThunk } from "../../store/spots";




const SpotDetail = () => {

    const {id} = useParams();


    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spotsReducer.byId[id]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      const getSpot = async () => {
        await dispatch(getSpotsThunk());
        setIsLoaded(true);
      };

      if (!isLoaded) {
        getSpot();
      }
    }, [dispatch, isLoaded]);



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
    <div>
      <h1>{spot.name}</h1>
      <h3>{`${spot.city}, ${spot.state}, ${spot.country}`}</h3>
      <img src={spot.previewImage} className="detail-preview-image"></img>
    </div>
  )
}
}

export default SpotDetail;
