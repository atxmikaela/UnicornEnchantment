import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import CrashCard from "./CrashCard";
import { useNavigate } from 'react-router-dom';
import './Crash.css';
import { loadCornholesThunk } from "../../store/cornholes";

const Crash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const cornholes = useSelector((state) => state.cornholes.cornholes); // THIS GUY IS STEP 8

  // ** USE SELECTOR ** Takes the data out of the store using the useSelector hook

  // AND THEN STEP 9 - -------- RENDER IN BROWSER ------- 9. Render the data taken out of step 8 in the browser using react jsx

const safeCornholesObject = cornholes || {};
const cornholeIds = Object.keys(safeCornholesObject);
  const cornholesArr = [];
  for (let i = 0; i < cornholeIds.length; i++) {
    const id = cornholeIds[i];
    cornholesArr.push(safeCornholesObject[id]);
  }


  console.log('my cornholes...', cornholesArr);


  const [isLoaded, setIsLoaded] = useState(false);


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
    navigate(`/cornholes/${cornhole.id}/`)
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
      <div className="card-list-container">
        {cornholesArr.length > 0 ? (
          cornholesArr.map((cornhole) => (
            <div
              className="card-container"
              key={`${cornhole.id}-${cornhole.id}`}
              onClick={(e) => goToCornholeDetail(e, cornhole)}
            >
              <CrashCard cornhole={cornhole} />
            </div>
          ))
        ) : (
          <p>No cornholes to display.</p>
        )}
      </div>
    </div>
        )
  }
  };


export default Crash;
