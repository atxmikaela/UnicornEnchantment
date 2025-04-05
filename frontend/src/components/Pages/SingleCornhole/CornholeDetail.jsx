import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CornholeDetail.css';
import { getSingleCornholeThunk } from "../../../store/cornholes";
import { useParams } from "react-router-dom";






const SingleCornhole = () => {
  const dispatch = useDispatch();
//
  const { id } = useParams();



  const cornhole = useSelector((state) => state.cornholesReducer.byId[id]);
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
    //since data is loaded for sure here since we are rending the else return...
    //create two variables to determine if images are preview or spot images to render in dom.

    let previewSpotImg;
    let spotImg = []
          for (const [key, value] of Object.entries(cornhole.SpotImages)) {
          if (cornhole.SpotImages[key].preview === true){
            previewSpotImg = cornhole.SpotImages[key].url;
          } else {
            spotImg.push(value);
          }


        }

        console.log(spotImg)

     return (
        <>

        <div className="cornhole-detail-page">
        <div className="cornhole-boxed-page-wrapper">

        <h1>{cornhole.name}</h1>
        <h3>{`${cornhole.city}, ${cornhole.state}, ${cornhole.country}`}</h3>

        <div className="cornhole-detail-main-panels">

        <div className="left-panel">
          <img src={previewSpotImg} className="detail-preview-image" />
        </div>




        <div className="right-panel">
        {spotImg.map((image, idx) => (
         <img key={idx} src={image.url} className="detail-images"></img>
        ))}
        </div>




        </div>



      </div>
      </div>
      </>
    )
  }

    export default SingleCornhole;
