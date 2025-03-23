import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SpotCard from '../Splash/SplashCard';

const SpotDetail = () => {

    const {id} = useParams();

    const spot = useSelector((state) => state.spotsReducer.byId[id]);

    console.log(spot)


  return (
    <div>
        <SpotCard spot = {spot} />
    </div>
  )
}

export default SpotDetail
