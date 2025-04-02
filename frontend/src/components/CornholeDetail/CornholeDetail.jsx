// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";


// import './CornholeDetail.css';
// import { loadCornholesThunk } from '../../store/cornholes';


// const CornholeDetail = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const cornhole = useSelector((state) => state.cornholes.cornholes);
//     // const reviews = useSelector((state) => state.reviews.reviews);
//     const sessionUser = useSelector((state) => state.session.user);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [previewUrl, setPreviewUrl] = useState(null);
//     const [detailImages, setDetailImages] = useState([]);
//     // const [userCanReview, setUserCanReview] = useState(false);
//     // const [showModal, setShowModal] = useState(false);





//     useEffect(() => {
//         const getCornhole = async () => {
//             await dispatch(loadCornholesThunk(id));
//             setIsLoaded(true);
//         };
//         // const getReviews = async () => {
//         //     await dispatch(loadReviewsThunk(id));
//         // }

//         if (!isLoaded) {
//             getCornhole();
//             // getReviews();
//         }
//     }, [dispatch, id, isLoaded]);


//     const timestampToMonthYear = ((timestamp) => {
//         if (!timestamp) return "";
//         const date = new Date(timestamp);
//         const monthNames = [
//             "January", "February", "March", "April", "May", "June",
//             "July", "August", "September", "October", "November", "December"
//         ];
//         return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
//     }, []);


//     // const ratingCheck = ((avgRating) => {
//     //     return avgRating !== null ? `★${cornhole.avgStarRating} - ${cornhole.numReviews} reviews` : "New";
//     // }, [cornhole]);


//     // const openModal = () => {
//     //     setShowModal(true);
//     // };


//     // const closeModal = () => {
//     //     setShowModal(false);
//     //     window.location.reload()
//     // };




//     useEffect(() => {
//         if (cornhole && cornhole.CornholeImages) {
//             const foundPreview = cornhole.CornholeImages.find((image) => image.preview === true);
//             if (foundPreview) {
//                 setPreviewUrl(foundPreview.url);
//                 setDetailImages(cornhole.CornholeImages.filter(image => image.preview === false));
//             } else {
//                 setDetailImages(cornhole.CornholeImages.filter(image => image.preview === false));
//             }
//         }
//     }, [cornhole]);


//     // useEffect(() => {
//     //     if (isLoaded && cornhole && sessionUser && allReviews) {
//     //         const hasReviewed = allReviews.some((review) => review.userId === sessionUser.id);
//     //         const isOwner = cornhole.ownerId === sessionUser.id;
//     //         setUserCanReview(!isOwner && !hasReviewed);
//     //     }
//     // }, [isLoaded, cornhole, sessionUser, allReviews]);



// // const handleDeleteReview = async (reviews) => {
// //     if (sessionUser) {
// //             await dispatch(deleteReviewThunk(reviews.id));

// //         }
// //     }

// }


//     if (!isLoaded || !cornhole) {
//         return (
//             <img
//                 src="https://media.tenor.com/WRNhKC63kkgAAAAM/loading-buffering.gif"
//                 style={{ height: "100px" }}
//                 alt="Loading..."
//             />
//         );
//     }




//     return (
//                 <h1>Hello there</h1>
//     )

// export default CornholeDetail;
