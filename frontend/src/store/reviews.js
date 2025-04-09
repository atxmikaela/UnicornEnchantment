/*

STEP 1 AND 2
1. Browser -> User does some action in the browser which leads to us triggering the need for data Example: navigating a page and needing to GET information from the backend

2. Component that is currently mounted on the browser -> This is the react file that is responsible for the page / or component that needs to access data changes Example that: React file for a whole page, maybe a react file for just simple nav bar

*/

// IMPORTS
import { csrfFetch } from './csrf';

// Action constants

//CODE IS IN CORRECT FORMAT
const GET_REVIEWS = 'reviews/getReviews';
const ADD_REVIEW = 'reviews/addReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/deleteReview';


// Action creators // STEP 6. In charge of packaging up our data using an object with type and payload

// CODE IS IN CORRECT FORMAT

const getReviewsAction = (reviews) => ({
  type: GET_REVIEWS,
  payload: reviews,
});

const addReviewAction = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

const updateReviewAction = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
})

const deleteReviewAction = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId,
});





/* STEP 3: THUNKS

Browser -> User does some action in the browser which leads to us triggering the need for data Example: navigating a page and needing to GET information from the backend

Component that is currently mounted on the browser -> This is the react file that is responsible for the page / or component that needs to access data changes Example that: React file for a whole page, maybe a react file for just simple nav bar

*/
// DO NOT TOUCH THIS CODE
export const getReviewsBySpotThunk = (spotId) => async (dispatch) => {
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

export const getReviewsByUserThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/current/`);

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



export const addReviewThunk = (review) => async (dispatch) => {

  try {
    const res = await csrfFetch('/api/reviews/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
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

export const updateReviewThunk = (review) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/review/${review.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updateReviewAction(data));
      return data;
    } else {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    return error;
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  try {
    console.log(reviewId, ": REVIEW ID AT THE THUNK")
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      const data = await res.json();
    dispatch(deleteReviewAction(reviewId));
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


const initialState = []

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS: {
      const reviewsArr = action.payload;
      newState = { ...state };
      newState.all = reviewsArr;
      return newState;
    }
    case ADD_REVIEW: {
      newState = { ...state };
      let newReview = action.payload;
      newState.all = [...newState.all, newReview];
      return newState;
    }
    case UPDATE_REVIEW: {
      newState = { ...state };
      let update = action.payload;
      newState.all[update.id] = [...newState.all[update.id]];
      return newState;
    }
    case DELETE_REVIEW: {
      newState = { ...state };
      let reviewId = action.payload;
      newState.all.filter((review) => review.id !== reviewId);
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
