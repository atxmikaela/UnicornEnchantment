import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsThunk } from "../../store/spots";
import SpotCard from "./SplashCard";
import { useNavigate } from 'react-router-dom';
import './Splash.css';

const Splash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spots = useSelector((state) => state.spotsReducer.allSpots);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getSpots = async () => {
      await dispatch(getSpotsThunk());
      setIsLoaded(true);
    };

    if (!isLoaded) {
      getSpots();
    }
  }, [dispatch, isLoaded]);

  const goToSpotDetail = (e, spot) => {
    e.preventDefault();
    navigate(`/spots/${spot.id}`)
  }

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
        <h1>Welcome to Unicorn BnB</h1>
        <div className="card-list-container">
        {spots.map((spot, idx) => (
          <div
          className="card-container"
          key={`${idx}-${spot.id}`}
          onClick={(e)=> goToSpotDetail(e, spot)}>
            <SpotCard spot={spot} />
          </div>
        ))}
        </div>
      </div>
    );
  }
};

export default Splash;
