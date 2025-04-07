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
const ADD_SPOT = 'spots/addSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const ADD_REVIEW = 'reviews/addReview';
const DELETE_SPOT = 'spots/deleteSpot';

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

const addSpotAction = (spot) => ({
  type: ADD_SPOT,
  payload: spot,
});

const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot,
});

const addReviewAction = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

const deleteSpotAction = (spotId) => ({
  type: DELETE_SPOT,
  payload: spotId,
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

export const addSpotThunk = (spot) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spot),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addSpotAction(data));
      return data;
    } else {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};

export const updateSpotThunk = (spot) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/spots/${spot.id}/edit/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spot),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updateSpotAction(data));
      return data;
    } else {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};

export const addReviewThunk = (reviewData) => async (dispatch) => {

  try {
    const res = await csrfFetch('/api/reviews/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(addReviewAction(data));

      return data;
    } else {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};

export const deleteSpotThunk = ({spotId}) => async (dispatch) => {
  console.log(spotId, "IS THE DATA BEING PASSED IN TO THE THUNK")
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    })
    console.log(spotId, "IS THE DATA BEING PASSED IN TO THE THUNK")
    if (res.ok) {
      const data = await res.json();
    dispatch(deleteSpotAction());
    console.log(data, "IS THE RESPONSE FROM THE SERVER")
    return data;
    } else {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};

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
    case ADD_SPOT: {
      newState = { ...state };
      return newState;
    }
    case UPDATE_SPOT: {
      newState = { ...state };
      return newState;
    }
    case ADD_REVIEW: {
      newState = { ...state };
      return newState;
    }
    case DELETE_SPOT: {
      newState = { ...state };
      return newState.filter((spot) => spot.id !== action.payload);
    }

    default:
      return state;
  }
};

// DO NOT TOUCH THIS CODE
export default spotReducer;
