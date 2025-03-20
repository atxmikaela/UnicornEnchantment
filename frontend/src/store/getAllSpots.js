// IMPORTS
import { csrfFetch } from './csrf';

// ACTION TYPES
const GET_ALL_SPOTS = '/spot/getAllSpots';



// ACTION CREATORS

const loadSpots = (spots) => {
    return {
      type: GET_ALL_SPOTS,
      payload: spots
    };
  };



// THUNKS


  export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        const spots = data.Spots;

        dispatch(loadSpots(spots));
        return spots;
    }
  };


// REDUCER

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const newState = {};
      action.payload.forEach((spot) => {
        newState[spot.id] = spot;
    });
      return newState;
  }
    default:
      return state;
  }
};

export default spotsReducer;
