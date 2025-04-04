import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CrashCard from "./CrashCard";
import './Home.css';
import { getCornholesThunk } from "../../../store/cornholes";
import { useNavigate } from "react-router-dom";





const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cornholes = useSelector((state) => state.cornholesReducer.allCornholes);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      const loadCornholes = async () => {
       await dispatch(getCornholesThunk());
       setIsLoaded(true);
      };

  if (!isLoaded) {

    loadCornholes();
  }
}, [dispatch, isLoaded]);

    const goToCornholeDetail = (e, cornhole) => {
      e.preventDefault();
      navigate(`/cornholes/${cornhole.id}`)
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
        <div className="cornhole-list-container">
        {cornholes.map((cornhole, idx) => (
          <div
          className="cornhole-container"
          key={`${idx}-${cornhole.id}`}
          onClick={(e)=> goToCornholeDetail(e, cornhole)}>
            <CrashCard cornhole={cornhole} />
          </div>
        ))}
        </div>
      </div>
    );
  }
}




export default Home;
