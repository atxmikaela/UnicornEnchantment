
/*

STEP 1 AND 2
1. Browser -> User does some action in the browser which leads to us triggering the need for data Example: navigating a page and needing to GET information from the backend

2. Component that is currently mounted on the browser -> This is the react file that is responsible for the page / or component that needs to access data changes Example that: React file for a whole page, maybe a react file for just simple nav bar

*/



// IMPORTS
import { csrfFetch } from "./csrf";

// Action constants
export const LOAD_REVIEWS = 'reviews/loadReviews';
export const CREATE_REVIEW = 'reviews/createReview';
export const UPDATE_REVIEW = 'reviews/updateReview';
export const REMOVE_REVIEW = 'reviews/removeReview';

// Action creators // STEP 6. In charge of packaging up our data using an object with type and payload
const loadReviewsAction = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});


const createReviewAction = (review) => ({
    type: CREATE_REVIEW,
    review
});

const editReviewAction = (review) => ({
    type: UPDATE_REVIEW,
    review
});

const deleteReviewAction = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
});


/* STEP 3: THUNKS

Browser -> User does some action in the browser which leads to us triggering the need for data Example: navigating a page and needing to GET information from the backend

Component that is currently mounted on the browser -> This is the react file that is responsible for the page / or component that needs to access data changes Example that: React file for a whole page, maybe a react file for just simple nav bar

*/

        export const loadReviewsThunk = () => async (dispatch) => {
        try {
            const response = await csrfFetch('/api/spots/');  // STEP 4 KINDA: Go to the route to see how the data is being retrieved/ processed in the route/ database
            if (response.ok) {
                const corn = await response.json();  // STEP 5: Data goes back to thunk
                dispatch(loadReviewsAction(corn.Spots));
            } else {
                throw response;
                }
            } catch (error) {
                return error;
            }
        };


        export const createReviewThunk = (review) => async (dispatch) => {
        try {
            const response = await csrfFetch('/api/spots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(review),
            });
            if (response.ok) {
                const corn = await response.json();
                dispatch(createReviewAction(corn));
                return corn;
            } else {
                throw response;
                }
            } catch (error) {
                return error;
            }
        };

        export const editReviewThunk = (review) => async (dispatch) => {
        try {
            const response = await csrfFetch(`/api/spots/${review.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(review),
            });
            if (response.ok) {
                const corn = await response.json();
                dispatch(editReviewAction(corn));
                return corn;
            } else {
                throw response;
                }
            } catch (error) {
                return error;
            }
        };

        export const deleteReviewThunk = (reviewId) => async (dispatch) => {
        try {
            const response = await csrfFetch(`/api/spots/${reviewId}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                dispatch(deleteReviewAction(reviewId));
                return response;
            } else {
                throw response;
                }
            } catch (error) {
                return error;
            }
        };



const initialState = { //initial state declaration and initiation
    reviews: {}, // storing all reviews by ID for o/1 time
 //initially tried also using an array to store them in order, but the indeces weren't synced with the ID's so I took an Object.keys approach.
};

// STEP 7 CONTINUED ON STORE PAGE WHEN REDUCER IS PASSED TO IT

// 7. In charge of placing our data into the store (Anthony calls this Big Dawg or Grand daddy reducer)


const reviewReducer = (state = initialState, action) => {
    // begin it with a switch action type. I know you do it a little differently
    switch (action.type) {
        case LOAD_REVIEWS: {
            // load all of my reviews into my state
            const newReviews = {}; //create my new object since state is immutable
            //const newbyIds = []; // do the same with an array
            // basic, I know lol
            for (let i = 0; i < action.reviews.length; i++) {
                const review = action.reviews[i];
                if (review && review.id) {
                    newReviews[review.id] = review;
                }
            }
            return {
                ...state,
                reviews: newReviews,
            };
        }


        case CREATE_REVIEW: {
            // add a new review after creating it
            const review = action.review;
            if (!review || !review.id) {
                return state;
            }
            const newReviews = { ...state.reviews };
            newReviews[review.id] = review; // Add the new review
              return {
                ...state,
                reviews: newReviews,
            };
        }

        case UPDATE_REVIEW: {
            // I’m updating an existing review
            const review = action.review;
            const newReviews = { ...state.reviews };
            newReviews[review.id] = review; // Update the review with this ID

            if (!review || !review.id) {
              return state;
              }

            // byIds doesn’t change since the ID stays the same
            return {
                ...state,
                reviews: newReviews,

            };
        }

        case REMOVE_REVIEW: {
            // I’m removing a review by ID
            const reviewId = action.reviewId;
            const newReviews = { ...state.reviews };
            delete newReviews[reviewId]; // Remove the review from the object
            return {
                ...state,
                reviews: newReviews,
             };
        }

        default:
            return state; // Return the unchanged state if the action doesn’t match
    }
};

export default reviewReducer;
