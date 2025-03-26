// import { useDispatch } from 'react-redux';
// import { useState } from 'react';

// let content;

// function CreateASpot () {
//   const dispatch = useDispatch();
//   const [country, setCountry] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [description, setDescription] = useState("");
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [previewImage, setPreviewImage] = useState([]);
//   const [firstSpotImg, setFirstSpotImg] = useState([]);
//   const [secondSpotImg, setSecondSpotImage] = useState([]);
//   const [thirdSpotImg, setThirdSpotImage] = useState([]);
//   const [fourthSpotImg, setFourthSpotImage] = useState([]);
//   const [errors, setErrors] = useState({});


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (country.length !== 0) {}
//     else if (address.length !== 0) {}
//     else if (city.length !== 0) {}
//     else if (state.length !== 0) {}
//     else if (description.length > 30) {}
//     else if (name.length !== 0) {}
//     else if (price.length !== 0) {}
//     else if (previewImage.length !== 0) {
//       setErrors({});
//       return dispatch(
//         createActions.create({
//           country,
//           address,
//           city,
//           state,
//           latitude,
//           longitude,
//           description,
//           name,
//           price,
//           previewImage,
//           firstSpotImg,
//           secondSpotImg,
//           thirdSpotImg,
//           fourthSpotImg
//         })
//       )
//         .catch(async (res) => {
//           const data = await res.json();
//           if (data?.errors) {
//             setErrors(data.errors);
//           }
//         });
//     }
//     return setErrors({
//     });
//   };
//

//   return (
//     <>
//       <h1>Create a new Spot</h1>
//       <h2>Where's your place located?</h2>
//       <p>Guests will only get your exact address once they booked a reservation</p>
//       <p></p>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Country  {errors.country && <p>{errors.country}</p>}
//           <input
//             type="text"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Address  {errors.address && <p>{errors.address}</p>}
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           City  {errors.city && <p>{errors.city}</p>}
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           State  {errors.state && <p>{errors.state}</p>}
//           <input
//             type="text"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Latitude  {errors.latitude && <p>{errors.latitude}</p>}
//           <input
//             type="text"
//             value={latitude}
//             onChange={(e) => setLatitude(e.target.value)}
//           />
//         </label>
//         <label>
//           Longitude  {errors.longitude && <p>{errors.longitude}</p>}
//           <input
//             type="text"
//             value={longitude}
//             onChange={(e) => setLongitude(e.target.value)}
//           />
//         </label>
//         <label>
//           Description  {errors.description && <p>{errors.description}</p>}
//           <input
//             type="textarea"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Name  {errors.name && <p>{errors.name}</p>}
//           <input
//             type="text"price
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Price  {errors.price && <p>{errors.price}</p>}
//           <input
//             type="text"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />previewImage
//         </label>
//         <label>
//           Preview Image  {errors.previewImage && <p>{errors.previewImage}</p>}
//           <input
//             type="text"
//             value={imageUrl1}
//             onChange={(e) => setPreviewImage(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           {errors.firstSpotImg && <p>{errors.firstSpotImg}</p>}
//           <input
//             type="text"
//             value={firstSpotImg}
//             onChange={(e) => setFirstSpotImg(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//         {errors.secondSpotImg && <p>{errors.secondSpotImg}</p>}
//           <input
//             type="text"
//             value={secondSpotImg}
//             onChange={(e) => setSecondSpotImg(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//         {errors.thirdSpotImg && <p>{errors.thirdSpotImg}</p>}
//           <input
//             type="text"
//             value={thirdSpotImg}
//             onChange={(e) => setThirdSpotImg(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//         {errors.fourthSpotImg && <p>{errors.fourthSpotImg}</p>}
//           <input
//             type="text"
//             value={fourthSpotImg}
//             onChange={(e) => setFourthSpotImg(e.target.value)}
//             required
//           />
//         </label>


//         <button type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }
const CreateASpot = () => {

}


export default CreateASpot;
