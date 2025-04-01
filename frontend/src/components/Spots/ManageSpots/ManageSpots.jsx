import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import { getSpotsThunk, deleteSpotsThunk} from "../../../store/spots";
import SpotCard from "../../Splash/SplashCard";
import "./ManageSpots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spots = useSelector((state) => state.spotsReducer.allSpots);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState(null);


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

  const openDeleteModal = (spotId) => {
    setSelectedSpotId(spotId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (selectedSpotId) {
      try {
        await dispatch(deleteSpotsThunk(selectedSpotId)); // Dispatch the delete action
        setShowModal(false);
        setSelectedSpotId(null);
        setIsLoaded(false); // Trigger a re-fetch of spots
      } catch (error) {
        console.error("Error deleting spot:", error);
        setShowModal(false);
        setSelectedSpotId(null);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSpotId(null);
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
        <h1>Manage your Cornholes</h1>
        {userSpots && userSpots.length > 0 ? (
          <div className="card-list-container">
            {userSpots.map((spot, idx) => (
              <div
                className="card-container"
                key={`${idx}-${spot.id}`}>
                <div onClick={(e) => goToSpotDetail(e, spot)}>
                <SpotCard spot={spot} />
              </div>
              <div className="card-buttons">
                <button onClick={() => editSpot(spot.id)}>Update</button>
                <button onClick={() => openDeleteModal(spot.id)}>Delete</button>
              </div>
            </div>
           ))}
           </div>
         ) : (
           <div className="no-spots">
             <h2><NavLink to="/spots/new">Create a new Cornhole</NavLink></h2>
           </div>
         )}

     {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button
              onClick={handleDelete}
              style={{ backgroundColor: "red", color: "white", marginRight: "10px" }}
            >
              Yes (Delete Spot)
            </button>
            <button
              onClick={closeModal}
              style={{ backgroundColor: "gray", color: "white" }}
            >
              No (Keep Spot)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
};
export default ManageSpots;
