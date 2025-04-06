/*

STEP 1 AND 2
1. Browser -> User does some action in the browser which leads to us triggering the need for data Example: navigating a page and needing to GET information from the backend

2. Component that is currently mounted on the browser -> This is the react file that is responsible for the page / or component that needs to access data changes Example that: React file for a whole page, maybe a react file for just simple nav bar

*/

// IMPORTS
import { csrfFetch } from './csrf';

// Action constants

//CODE IS IN CORRECT FORMAT
const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot';
const GET_REVIEWS = 'spots/getReviews';

// Action creators // STEP 6. In charge of packaging up our data using an object with type and payload

// CODE IS IN CORRECT FORMAT
const getAllSpotsAction = (spots) => ({
  type: GET_ALL_SPOTS,
  payload: spots,
});

const getSingleSpotAction = (spot) => ({
  type: GET_SINGLE_SPOT,
  payload: spot,
});

const getReviewsAction = (reviews) => ({
  type: GET_REVIEWS,
  payload: reviews,
});

/* STEP 3: THUNKS

Browser -> User does some action in the browser which leads to us triggering the need for data Example: navigating a page and needing to GET information from the backend

Component that is currently mounted on the browser -> This is the react file that is responsible for the page / or component that needs to access data changes Example that: React file for a whole page, maybe a react file for just simple nav bar

*/
// DO NOT TOUCH THIS CODE
export const getSpotsThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllSpotsAction(data.Spots));
      return;
    } else {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};

export const getSingleSpotThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if (res.ok) {
      const data = await res.json();

      dispatch(getSingleSpotAction(data));

      return;
    } else {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};

export const getReviewsThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);


    if (res.ok) {
      const data = await res.json();
      console.log(data, "IS THE DATA")

      dispatch(getReviewsAction(data.Reviews));

      return;
    } else {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};

// storing all cornholes by ID for o/1 time
//initially tried also using an array to store them in order, but the indeces weren't synced with the ID's so I took an Object.keys approach.

// STEP 7 CONTINUED ON STORE PAGE WHEN REDUCER IS PASSED TO IT

// 7. In charge of placing our data into the store (Anthony calls this Big Dawg or Grand daddy reducer)

// DO NOT TOUCH THIS CODE
const initialState = {
  allSpots: [],
  byId: {},
  reviews: [],
};
// DO NOT TOUCH THIS CODE
const spotReducer = (state = initialState, action) => {
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
    case GET_SINGLE_SPOT: {
      const spot = action.payload;
      newState = { ...state };
      newState.byId = { [spot.id]: spot };
      return newState;
    }
    case GET_REVIEWS: {
      const reviewArr = action.payload;
      newState = { ...state };
      newState.reviews = reviewArr;
      return newState;
    }
    default:
      return state;
  }
};
// DO NOT TOUCH THIS CODE
export default spotReducer;
