import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import CrashCard from "../../Crash/CrashCard";
import "./ManageCornholes.css";
import { deleteCornholeThunk, loadCornholesThunk } from "../../../store/cornholes";

const ManageCornholes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cornholes = useSelector((state) => state.cornholes);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCornholeId, setSelectedCornholeId] = useState(null);


  useEffect(() => {
    const loadCornholes = async () => {
      await dispatch(loadCornholesThunk());
      setIsLoaded(true);
    };

    if (!isLoaded) {
      loadCornholes();
    }
  }, [dispatch, isLoaded]);

  const goToCornholeDetail = (e, cornhole) => {
    e.preventDefault();
    navigate(`/cornholes/${cornhole.id}`);
  };

  const editCornhole = (cornholeId) => {
    navigate(`/cornholes/${cornholeId}/edit`);
  };

  const openDeleteModal = (cornholeId) => {
    setSelectedCornholeId(cornholeId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (selectedCornholeId) {
      try {
        await dispatch(deleteCornholeThunk(selectedCornholeId)); // Dispatch the delete action
        setShowModal(false);
        setSelectedCornholeId(null);
        setIsLoaded(false); // Trigger a re-fetch of spots
      } catch (error) {
        console.error("Error deleting cornhole:", error);
        setShowModal(false);
        setSelectedCornholeId(null);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCornholeId(null);
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

    const userCornholes = cornholes.filter(cornhole => cornhole.ownerId === sessionUser.id);
    return (
      <div>
        <h1>Manage your Cornholes</h1>
        {userCornholes && userCornholes.length > 0 ? (
          <div className="card-list-container">
            {userCornholes.map((cornhole, idx) => (
              <div
                className="card-container"
                key={`${idx}-${cornhole.id}`}>
                <div onClick={(e) => goToCornholeDetail(e, cornhole)}>
                <CrashCard cornhole={cornhole} />
              </div>
              <div className="card-buttons">
                <button onClick={() => editCornhole(cornhole.id)}>Update</button>
                <button onClick={() => openDeleteModal(cornhole.id)}>Delete</button>
              </div>
            </div>
           ))}
           </div>
         ) : (
           <div className="no-spots">
             <h2><NavLink to="/cornholes/new">Create a new Cornhole</NavLink></h2>
           </div>
         )}

     {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this cornhole from the listings?</p>
            <button
              onClick={handleDelete}
              style={{ backgroundColor: "red", color: "white", marginRight: "10px" }}
            >
              Yes (Delete Cornhole)
            </button>
            <button
              onClick={closeModal}
              style={{ backgroundColor: "gray", color: "white" }}
            >
              No (Keep Cornhole)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
};
export default ManageCornholes;
