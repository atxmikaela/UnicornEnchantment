// IMPORTS
import { csrfFetch } from "./csrf";

// ACTION TYPES
const GET_ALL_SPOTS = "/spot/getAllSpots";
const DELETE_SPOTS = "spot/deleteSpots";

//step 6
// ACTION CREATORS - USE ACTION AT THE END OF FUNCTION NAME
export const getAllSpotsAction = (spots) => {
  const action = {
    type: GET_ALL_SPOTS,
    payload: spots,
  };
  return action;
};

export const deleteSpots = (spotId) => ({
    type: DELETE_SPOTS,
    spotId,
  });
// THUNKS - USE THUNKS AT THE END OF FUNCTION NAME
export const getSpotsThunk = () => async (dispatch) => {

    const res = await csrfFetch("/api/spots");
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllSpotsAction(data.Spots));
    } else {
      const errorData = await res.json();
      return errorData;
    }

};


export const deleteSpotsThunk = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(deleteSpots(spotId));
      return { message: "Spot deleted successfully" };
    } else {
      const error = await response.json();
      console.error("Backend error:", error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error deleting spot:", error);
    throw error;
  }
};

const initialState = {};

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
