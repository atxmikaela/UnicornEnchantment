// IMPORTS
import { csrfFetch } from "./csrf";

// ACTION TYPES
const GET_ONE_SPOT = "/spot/getOneSpot";

//step 6
// ACTION CREATORS - USE ACTION AT THE END OF FUNCTION NAME

export const getSpotAction = (spot) => {
  const action = {
    type: GET_ONE_SPOT,
    payload: spot,
  };
  return action;
};

// THUNKS - USE THUNKS AT THE END OF FUNCTION NAME

export const getSpotThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getSpotAction(data));
    } else {
      const errorData = await res.json();
      return errorData;
    }
  } catch (error) {return}
};

// step 7
// normalizing our state

const initialState = {
  byId: {},
};

// REDUCER

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ONE_SPOT: {
      const spot = action.payload;
      newState = {
        ...state,
        byId: {
          ...state.byId,
          [spot.id]: spot,
        },
      };

      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
