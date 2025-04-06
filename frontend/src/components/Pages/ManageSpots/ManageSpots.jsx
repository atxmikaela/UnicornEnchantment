import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './../Home/Home.css';
import { useNavigate } from "react-router-dom";
import SpotCard from "./../Home/SpotCard";
import { getSpotsThunk } from "../../../store/spots";
import OpenModalButton from "../../Modals/OpenModalButton/OpenModalButton";
import DeleteSpotModal from "../../Modals/DeleteSpotModal";


const ManageSpots = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spots = useSelector((state) => state.spots.allSpots);
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUserId = useSelector((state) => state.session.user.id);
  const spotId = spots.id;

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


    const userSpots = spots.filter(spot => spot.ownerId === sessionUserId);

   return (
      <div>

        <h1>Manage Your Spots</h1>
        {userSpots && (
        <div className="spot-list-container">
        {userSpots.map((spot, idx) => (
          <div
          className="spot-container"
          key={`${idx}-${sessionUserId}`}
          onClick={(e)=> goToSpotDetail(e, spot)}>
            <SpotCard spot={spot} />
            <a href="/spots/new"><button>Update</button></a>
            <OpenModalButton buttonText="Delete"
            modalComponent={<DeleteSpotModal spotId={spotId} />}/>
          </div>

        ))}

        </div>
        )}
        {!userSpots && (
            <button href="/spots/new">Create a New Spot</button>
        )}
      </div>
    );
  }
}




export default ManageSpots;
