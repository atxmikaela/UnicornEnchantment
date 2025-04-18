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
const ADD_SPOT = 'spots/addSpot';
const UPDATE_SPOT = 'spots/updateSpot';
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

const addSpotAction = (spot) => ({
  type: ADD_SPOT,
  payload: spot,
});

const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot,
});

const deleteSpotAction = (spot) => ({
  type: DELETE_SPOT,
  payload: spot,
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

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  try {

    const res = await csrfFetch(`/api/${spotId}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      const data = await res.json();
    dispatch(deleteSpotAction(data));
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


const initialState = {
    all: [],
    byId: {},
  }

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const spotsArr = action.payload;
      newState = { ...state };
      newState.all = spotsArr;
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
    case ADD_SPOT: {
      newState = { ...state };
      let newSpot = action.payload;
      newState.all = [...newState.all, newSpot]
      newState.byId = {...newState.byId, [newSpot.id]: newSpot};
      return newState;
    }
    case UPDATE_SPOT: {
      newState = { ...state };
      let update = action.payload;
      newState.all[update.id] = [...newState.all[update.id]]
      return newState;
    }
    case DELETE_SPOT: {
      newState = { ...state };
      let spotId = action.payload;
      newState.all.filter((spot) => spot.id !== spotId);
      newState.byId = {...newState.byId};
      delete newState.byId[spotId];
      return newState;
    }

    default:
      return state;
  }
};

// DO NOT TOUCH THIS CODE
export default spotReducer;
