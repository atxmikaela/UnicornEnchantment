import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CornholeDetail.css';
import { getSingleCornholeThunk } from "../../../store/cornholes";
import { useParams } from "react-router-dom";






const SingleCornhole = () => {
  const dispatch = useDispatch();
//
  const { id } = useParams();
 

  const cornhole = useSelector((state) => state.cornholesReducer.singleCornhole);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  const getCornhole = async () => {
    await dispatch(getSingleCornholeThunk(id));
    setIsLoaded(true);
  };

  if(!isLoaded) {

  getCornhole();
    }
  },[dispatch, id, isLoaded]);

  if (!isLoaded || !cornhole) {
    return (
        <img
            src="https://media.tenor.com/WRNhKC63kkgAAAAM/loading-buffering.gif"
            style={{ height: "100px" }}
            alt="Loading..."
        />
    );
}
      console.log(cornhole.previewImage)
  return (
        <>

        <div className="cornhole-detail-page">


        <div className="cornhole-detail-page-container">
        <h1>{cornhole.name}</h1>
        <h3>{`${cornhole.city}, ${cornhole.state}, ${cornhole.country}`}</h3>

        <div className="left-panel">
          <img src={cornhole.previewImage} className="detail-preview-image" />
        </div>

        <div className="right-panel">

        </div>








      </div>
      </div>
      </>
    )
  }

    export default SingleCornhole;
