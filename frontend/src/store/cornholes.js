
/*

STEP 1 AND 2
1. Browser -> User does some action in the browser which leads to us triggering the need for data Example: navigating a page and needing to GET information from the backend

2. Component that is currently mounted on the browser -> This is the react file that is responsible for the page / or component that needs to access data changes Example that: React file for a whole page, maybe a react file for just simple nav bar

*/



// IMPORTS
import { csrfFetch } from "./csrf";

// Action constants
export const LOAD_CORNHOLES = 'cornholes/loadCornholes';
export const RECEIVE_CORNHOLE = 'cornholes/receiveCornhole';
export const CREATE_CORNHOLE = 'cornholes/createCornhole';
export const UPDATE_CORNHOLE = 'cornholes/updateCornhole';
export const REMOVE_CORNHOLE = 'cornholes/removeCornhole';

// Action creators // STEP 6. In charge of packaging up our data using an object with type and payload
const loadCornholesAction = (cornholes) => ({
    type: LOAD_CORNHOLES,
    cornholes
});

const receiveCornholeAction = (cornhole) => ({
    type: RECEIVE_CORNHOLE,
    cornhole
});

const createCornholeAction = (cornhole) => ({
    type: CREATE_CORNHOLE,
    cornhole
});

const editCornholeAction = (cornhole) => ({
    type: UPDATE_CORNHOLE,
    cornhole
});

const deleteCornholeAction = (cornholeId) => ({
    type: REMOVE_CORNHOLE,
    cornholeId
});


/* STEP 3: THUNKS

Browser -> User does some action in the browser which leads to us triggering the need for data Example: navigating a page and needing to GET information from the backend

Component that is currently mounted on the browser -> This is the react file that is responsible for the page / or component that needs to access data changes Example that: React file for a whole page, maybe a react file for just simple nav bar

*/

        export const loadCornholesThunk = () => async (dispatch) => {
        try {
            const response = await csrfFetch('/api/spots/');  // STEP 4 KINDA: Go to the route to see how the data is being retrieved/ processed in the route/ database
            if (response.ok) {
                const corn = await response.json();  // STEP 5: Data goes back to thunk
                dispatch(loadCornholesAction(corn.Spots));
            } else {
                throw response;
                }
            } catch (error) {
                return error;
            }
        };

        export const receiveCornholeThunk = (cornholeId) => async (dispatch) => {
        try {
            const response = await csrfFetch(`/api/spots/${cornholeId}`);
            if (response.ok) {
                const corn = await response.json();
                dispatch(receiveCornholeAction(corn));
            } else {
                throw response;
                }
            } catch (error) {
                return error;
            }
        };

        export const createCornholeThunk = (cornhole) => async (dispatch) => {
        try {
            const response = await csrfFetch('/api/spots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cornhole),
            });
            if (response.ok) {
                const corn = await response.json();
                dispatch(createCornholeAction(corn));
                return corn;
            } else {
                throw response;
                }
            } catch (error) {
                return error;
            }
        };

        export const editCornholeThunk = (cornhole) => async (dispatch) => {
        try {
            const response = await csrfFetch(`/api/spots/${cornhole.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cornhole),
            });
            if (response.ok) {
                const corn = await response.json();
                dispatch(editCornholeAction(corn));
                return corn;
            } else {
                throw response;
                }
            } catch (error) {
                return error;
            }
        };

        export const deleteCornholeThunk = (cornholeId) => async (dispatch) => {
        try {
            const response = await csrfFetch(`/api/spots/${cornholeId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                dispatch(deleteCornholeAction(cornholeId));
                return response;
            } else {
                throw response;
                }
            } catch (error) {
                return error;
            }
        };



const initialState = { //initial state declaration and initiation
    cornholes: {}, // storing all cornholes by ID for o/1 time
 //initially tried also using an array to store them in order, but the indeces weren't synced with the ID's so I took an Object.keys approach.
};

// STEP 7 CONTINUED ON STORE PAGE WHEN REDUCER IS PASSED TO IT

// 7. In charge of placing our data into the store (Anthony calls this Big Dawg or Grand daddy reducer)


const cornholeReducer = (state = initialState, action) => {
    // begin it with a switch action type. I know you do it a little differently
    switch (action.type) {
        case LOAD_CORNHOLES: {
            // load all of my cornholes into my state
            const newCornholes = {}; //create my new object since state is immutable
            //const newbyIds = []; // do the same with an array
            // basic, I know lol
            for (let i = 0; i < action.cornholes.length; i++) {
                const cornhole = action.cornholes[i];
                if (cornhole && cornhole.id) {
                    newCornholes[cornhole.id] = cornhole;
                }
            }
            return {
                ...state,
                cornholes: newCornholes,
            };
        }

        case RECEIVE_CORNHOLE: {
            // adding a single cornhole to the state
            const cornhole = action.cornhole;
            if (!cornhole || !cornhole.id) {
                return state;
            }
            const newCornhole = { ...state.cornholes };
            newCornhole[cornhole.id] = cornhole;
               return {
                ...state,
                cornholes: newCornhole,
            };
        }



        case CREATE_CORNHOLE: {
            // add a new cornhole after creating it
            const cornhole = action.cornhole;
            if (!cornhole || !cornhole.id) {
                return state;
            }
            const newCornholes = { ...state.cornholes };
            newCornholes[cornhole.id] = cornhole; // Add the new cornhole
              return {
                ...state,
                cornholes: newCornholes,
            };
        }

        case UPDATE_CORNHOLE: {
            // I’m updating an existing cornhole
            const cornhole = action.cornhole;
            const newCornholes = { ...state.cornholes };
            newCornholes[cornhole.id] = cornhole; // Update the cornhole with this ID

            if (!cornhole || !cornhole.id) {
              return state;
              }

            // byIds doesn’t change since the ID stays the same
            return {
                ...state,
                cornholes: newCornholes,

            };
        }

        case REMOVE_CORNHOLE: {
            // I’m removing a cornhole by ID
            const cornholeId = action.cornholeId;
            const newCornholes = { ...state.cornholes };
            delete newCornholes[cornholeId]; // Remove the cornhole from the object
            return {
                ...state,
                cornholes: newCornholes,
             };
        }

        default:
            return state; // Return the unchanged state if the action doesn’t match
    }
};

export default cornholeReducer;
