// IMPORTS
import { csrfFetch } from "./csrf";

// ACTION TYPES
const GET_ALL_SPOTS = "/spot/getAllSpots";

//step 6
// ACTION CREATORS - USE ACTION AT THE END OF FUNCTION NAME
export const getAllSpotsAction = (spots) => {
  const action = {
    type: GET_ALL_SPOTS,
    payload: spots,
  };
  return action;
};

// THUNKS - USE THUNKS AT THE END OF FUNCTION NAME
export const getSpotsThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/spots");
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllSpotsAction(data.Spots));

    } else {
      const errorData = await res.json();
    }
  } catch (error) {
  }
}

// step 7
// normalizing our state

const initialState = {
  allSpots: [],
  byId: {},
};

// REDUCER

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const spotsArr = action.payload;
      newState = { ...state };
      newState.allSpots = spotsArr;
      let newByIdGetAllSpots = {};
      for (let spot of spotsArr) {
        newByIdGetAllSpots[spot.id] = spot;
      }
      newState.byId = newByIdGetAllSpots;

      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
