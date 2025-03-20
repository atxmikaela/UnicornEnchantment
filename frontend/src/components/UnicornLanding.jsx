import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../store/getAllSpots";




const UnicornLanding = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots);


    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);



    return (
        <>

        <h1>Spot List</h1>
        {Object.values(spots).map((spot) => (
            <div key={spot.id}>
                {spot.name}
            </div>
        ))}

        </>
    );
};

export default UnicornLanding
