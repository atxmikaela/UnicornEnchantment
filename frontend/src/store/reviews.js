import { csrfFetch } from "./csrf";

// ACTION TYPES
const GET_ALL_REVIEWS = "/review/getAllReviews";
const ADD_REVIEW = "/review/addReview";
const DELETE_REVIEW ="/review/deleteReview";

// ACTION CREATORS - USE ACTION AT THE END OF FUNCTION NAME
export const getAllReviewsAction = (reviews) => {
    const action = {
        type: GET_ALL_REVIEWS,
        payload: reviews,
    };
    return action;
};

export const addReview = (review) => {
    const action = {
        type: ADD_REVIEW,
        payload: review,
    };
    return action;
}

export const deleteReview = (id) => ({
        type: DELETE_REVIEW,
        payload: id,

});

// THUNKS - USE THUNKS AT THE END OF FUNCTION NAME
export const getReviewsThunk = (spotId) => async (dispatch) => {
    try {
        ("Fetching reviews for spotId:", spotId);
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
        if (res.ok) {
            const data = await res.json();
            ("API response:", data);
            ("Reviews data:", data.Reviews);
            dispatch(getAllReviewsAction(data.Reviews));
            ("Action dispatched:", getAllReviewsAction(data.Reviews));
        } else {
            const errorData = await res.json();
            console.error("API error:", errorData);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

export const addReviewThunk = (reviewData) => async (dispatch) => {

    const response = await csrfFetch("/api/reviews", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data));
        return data;
    } else {
        const error = await response.json();
        return Promise.reject(error);
    }
};

export const deleteReviewThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/session/${id}`, {
      method: 'DELETE',
      });
    dispatch(deleteReview());
    return response;
  };

// normalizing our state

const initialState = {

    byId: {}, // Correct initial state
};

// REDUCER

const reviewsReducer = (state = initialState, action) => {
    let newState;
    ("Reducer action:", action);
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            const reviewsArr = action.payload;
            ("Reducer payload:", reviewsArr);
            newState = { ...state };
            newState.allReviews = reviewsArr;
            let newByIdGetAllReviews = {};
            for (let review of reviewsArr) {
                newByIdGetAllReviews[review.id] = review;
            }
            newState.byId = newByIdGetAllReviews;
            ("Reducer new state:", newState);
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
