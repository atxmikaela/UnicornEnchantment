import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Home.css';
import { useNavigate } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots";
import SpotCard from "./SpotCard";





const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spots = useSelector((state) => state.spots.allSpots);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      const loadSpots = async () => {
       await dispatch(getSpotsThunk());
       setIsLoaded(true);
      };

  if (!isLoaded) {

    loadSpots();
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
        <h1>Welcome to Unicorn Encounters</h1>
        <div className="spot-list-container">
        {spots.map((spot, idx) => (
          <div
          className="spot-container"
          key={`${idx}-${spot.id}`}
          onClick={(e)=> goToSpotDetail(e, spot)}>
            <SpotCard spot={spot} />
          </div>
        ))}
        </div>
      </div>
    );
  }
}




export default Home;
