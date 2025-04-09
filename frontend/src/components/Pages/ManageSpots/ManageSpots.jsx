import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import { getSpotsThunk } from "../../../store/spots";

import "./ManageSpots.css";
import SpotCard from "../Home/SpotCard";
import OpenModalButton from "../../Modals/OpenModalButton/OpenModalButton";
import DeleteSpotModal from "../../Modals/DeleteSpotModal";



const ManageSpots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const spots = useSelector((state) => state.spots.all);
  const sessionUser = useSelector((state) => state.session.user);
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
    navigate(`/spots/${spot.id}`);
  };

  const editSpot = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };



  if (!isLoaded) {
    return (
      <img
        src="https://media.tenor.com/WRNhKC63kkgAAAAM/loading-buffering.gif"
        style={{ height: "100px" }}
        alt="Loading..."
      />
    );
  } else {

    const userSpots = spots.filter(spot => spot.ownerId === sessionUser.id);




    return (
      <div>
        <h1 className="title">Manage your Spots</h1>
        {userSpots && userSpots.length > 0 ? (
          <div className="card-list-container">
            {userSpots.map((spot, idx) => (
              <div
                className="card-container"
                key={`${idx}-${spot.id}`}>
                <div onClick={(e) => goToSpotDetail(e, spot)}>
                <SpotCard spot={spot}/>
              </div>

      <div className="card-buttons">
                <button onClick={() => editSpot(spot.id)}>Update</button>
                <OpenModalButton
                 buttonText="Delete"
                 modalComponent={<DeleteSpotModal spotId={spot.id} />}
                 />
              </div>



            </div>
           ))}
           </div>
         ) : (
           <div className="no-spots">
             <h2><NavLink to="/spots/new">Create a new Spot</NavLink></h2>
           </div>
         )}


    </div>
  );
}
};
export default ManageSpots;
