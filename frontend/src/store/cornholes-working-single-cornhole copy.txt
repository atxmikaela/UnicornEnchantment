/*

STEP 1 AND 2
1. Browser -> User does some action in the browser which leads to us triggering the need for data Example: navigating a page and needing to GET information from the backend

2. Component that is currently mounted on the browser -> This is the react file that is responsible for the page / or component that needs to access data changes Example that: React file for a whole page, maybe a react file for just simple nav bar

*/

// IMPORTS
import { csrfFetch } from './csrf';

// Action constants
//DO NOT TOUCH THIS CODE
const GET_ALL_CORNHOLES = 'cornholes/getAllCornholes';
const GET_SINGLE_CORNHOLE = 'cornholes/getSingleCornhole';

// Action creators // STEP 6. In charge of packaging up our data using an object with type and payload
//DO NOT TOUCH THIS CODE
const getAllCornholesAction = (corn) => ({
  type: GET_ALL_CORNHOLES,
  payload: corn,
});

const getSingleCornholeAction = (cornhole) => ({
  type: GET_SINGLE_CORNHOLE,
  payload: cornhole,
});

/* STEP 3: THUNKS

Browser -> User does some action in the browser which leads to us triggering the need for data Example: navigating a page and needing to GET information from the backend

Component that is currently mounted on the browser -> This is the react file that is responsible for the page / or component that needs to access data changes Example that: React file for a whole page, maybe a react file for just simple nav bar

*/
// DO NOT TOUCH THIS CODE
export const getCornholesThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch('/api/spots');
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllCornholesAction(data.Spots));
      return;
    } else {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};

export const getSingleCornholeThunk = (cornholeId) => async (dispatch) => {
  try {

    const res = await csrfFetch(`/api/spots/${cornholeId}`);


    if (res.ok) {
      const data = await res.json();

      dispatch(getSingleCornholeAction(data));


      return;
    } else {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};





    // const encounterResponse = await csrfFetch(
    //   `/api/spots/${cornId}/encounters`,
    // );

//     return { cornhole: corn };
//   } catch (error) {
//     return error;


export const createCornholesThunk = (cornhole) => async (dispatch) => {
  try {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cornhole)
    }
    const res = await csrfFetch(`/api/spots/`, options); // STEP 3 KINDA: Go to the route to see how the data is being retrieved/ processed in the route/ database
    if (res.ok) {
      const data = await res.json(); // STEP 5: Data goes back to thunk
      dispatch(getAllCornholesAction(data.Spots));
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
  allCornholes: [],
  byId: {},
};
// DO NOT TOUCH THIS CODE
const cornholesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_CORNHOLES: {
      const cornholesArr = action.payload;
      newState = { ...state };
      newState.allCornholes = cornholesArr;
      let newByIdGetAllCornholes = {};
      for (let cornhole of cornholesArr) {
        newByIdGetAllCornholes[cornhole.id] = cornhole;
      }
      newState.byId = newByIdGetAllCornholes;
      return newState;
    }
    case GET_SINGLE_CORNHOLE: {
      const cornhole = action.payload;
      newState = { ...state,
          singleCornhole: {
            ...state.singleCornhole,
            [cornhole.id]: cornhole
          },
       };

      return newState;
    }
    default:
      return state;
  }
};
// DO NOT TOUCH THIS CODE
export default cornholesReducer;
