// IMPORTS
import { csrfFetch } from "./csrf";

// ACTION TYPES
const GET_ONE_SPOT = "/spot/getOneSpot";
const ADD_SPOT = "spot/createSpot";

//step 6
// ACTION CREATORS - USE ACTION AT THE END OF FUNCTION NAME

export const getSpotAction = (spot) => {
  const action = {
    type: GET_ONE_SPOT,
    payload: spot,
  };
  return action;
};

export const addSpot = (spot) => {
  const action = {
  type: ADD_SPOT,
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


export const addSpotThunk = (spot) => async (dispatch) => {
    const { country, address, city, state, lat, lng, description, name, price, previewImage, firstSpotImg, secondSpotImg, thirdSpotImg, fourthSpotImg } = spot;
    try{
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify({
        country, address, city, state, lat, lng, description, name, price, previewImage, firstSpotImg, secondSpotImg, thirdSpotImg, fourthSpotImg
      })
    });
    if (response.ok) {
    const data = await response.json();
    dispatch(addSpot(data))
    console.log("MOTHERFUCKER JONES", data);
    return data;

} else {
    const errorData = await response.json();
    console.log("Error creating spot", errorData);
    return errorData
}
    } catch (error) {
      console.log('what were you thunkin', error);
      return error;
    }
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
