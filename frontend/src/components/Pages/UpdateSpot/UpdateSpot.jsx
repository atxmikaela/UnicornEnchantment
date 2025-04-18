
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleSpotThunk, updateSpotThunk } from '../../../store/spots';
import '../AddSpot/AddSpot.css';




const UpdateSpot = () => {

  const { spid } = useParams();



  const oldSpot = useSelector((state) => state.spots.byId[spid]);

  console.log(oldSpot, "old spot")


  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [firstSpotImg, setFirstSpotImg] = useState("");
  const [secondSpotImg, setSecondSpotImg] = useState("");
  const [thirdSpotImg, setThirdSpotImg] = useState("");
  const [fourthSpotImg, setFourthSpotImg] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getSpot = async () => {
      await dispatch(getSingleSpotThunk(spid));
      setIsLoaded(true);
    };

    if (!isLoaded) {
      getSpot();
    }
  }, [dispatch, spid, isLoaded]);


  if (!isLoaded || !spid) {
    return (
      <img
        src="https://media.tenor.com/WRNhKC63kkgAAAAM/loading-buffering.gif"
        style={{ height: "100px" }}
        alt="Loading..."
      />
    );
  } else {


  // has to be async
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    //FIGURE OUT HOW TO GET RID OF THIS
    const imageRegex = /\.(png|jpe?g)$/i;

    if (!country) {
      newErrors.country = 'Country is required';
    }

    if (!address) {
      newErrors.address = 'Street is required';
    }

    if (!city) {
      newErrors.city = 'City is required';
    }

    if (!state) {
      newErrors.state = 'State is required';
    }

    if (!lat) {
      newErrors.lat = 'Latitude is required';
    }

    if (!lng) {
      newErrors.lng = 'Longitude is required';
    }

    if (description.length < 30) {
      newErrors.description = 'Description needs a minimum of 30 characters';
    }

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!price) {
      newErrors.price = 'Price is required';
    }

    if (!previewImage) {
      newErrors.previewImage = 'Preview Image is required';
    } else if (previewImage && !imageRegex.test(previewImage)) {
      newErrors.previewImage = 'Image URL must end in png, jpg, or jpeg';
    }

    if (firstSpotImg && !imageRegex.test(firstSpotImg)) {
      newErrors.firstSpotImg = 'Image URL must end in png, jpg, or jpeg';
    }

    if (secondSpotImg && !imageRegex.test(secondSpotImg)) {
      newErrors.secondSpotImg = 'Image URL must end in png, jpg, or jpeg';
    }

    if (thirdSpotImg && !imageRegex.test(thirdSpotImg)) {
      newErrors.thirdSpotImg = 'Image URL must end in png, jpg, or jpeg';
    }

    if (fourthSpotImg && !imageRegex.test(fourthSpotImg)) {
      newErrors.fourthSpotImg = 'Image URL must end in png, jpg, or jpeg';
    }

    setErrors(newErrors);




    if (Object.keys(newErrors).length === 0) {
      const spot = {
        country,
        address,
        city,
        state,
        lat,
        lng,
        description,
        name,
        price,
        previewImage,
        firstSpotImg,
        secondSpotImg,
        thirdSpotImg,
        fourthSpotImg,
      };

      const data = await dispatch(updateSpotThunk(spot))
      //avoid .thens  .then((data) => {
          console.log("Created spot ID:", data.id);
          reset();
          navigate(`/spots/${data.id}`);
      } else {
        return;
      }
    };

  const reset = () => {
    setCountry('');
    setAddress('');
    setCity('');
    setState('');
    setLat('')
    setLng('');
    setDescription('');
    setName('');
    setPrice('');
    setPreviewImage('');
    setFirstSpotImg('');
    setSecondSpotImg('');
    setThirdSpotImg('');
    setFourthSpotImg('');
  };

  return (
    <div className='inputBox'>
      <h1>Update your Spot Bruh</h1>
      <h2>Where&apos;s your spot located?</h2>
      <p>Guests will only get your exact address once they booked a reservation</p>
      <form onSubmit={handleSubmit}>
        <label>
        {errors.country ? <div className="error-message">{errors.country}</div>: null }
          <input
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder='Country'
            name='country'
          />
        </label>
        <label>
        <p></p>{errors.address ? <div className="error-message">{errors.address}</div>: null}
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder='Address'
            name='address'
          />
        </label>
        <label>
        <p></p>{errors.city ? <div className="error-message">{errors.city}</div>: null}
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder='City'
            name='city'
          />
        </label>
        <label>
        <p></p>{errors.state ? <div className="error-message">{errors.state}</div>: null}
          <input
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder='STATE'
            name='state'
          />
        </label>
        <label>
        <p></p>{errors.lat ? <div className="error-message">{errors.lat}</div>: null}
          <input
            type="text"
            onChange={(e) => setLat(e.target.value)}
            value={lat}
            placeholder='Latitude'
            name='lat'
          />
        </label>
        <label>
        <p></p>{errors.lng ? <div className="error-message">{errors.lng}</div>: null}
          <input
            type="text"
            onChange={(e) => setLng(e.target.value)}
            value={lng}
            placeholder='Longitude'
            name='lng'
          />
        </label>
        <label>
          <h2>Describe your spot to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          {errors.description ? <div className="error-message">{errors.description}</div>: null}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="textarea"
            placeholder='Description'
            rows='6'
          />
        </label>
        <label>
          <h2>Create a title for your spot</h2>
          <p>Catch guests&apos; attention with a spot title that highlights what makes your spot special.</p>
          {errors.name ? <div className="error-message">{errors.name}</div>: null}
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder='Name of your spot'
            name='name'
          />
        </label>
        <label>
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your spot stand out and rank higher in search results.</p>
          {errors.price ? <div className="error-message">{errors.price}</div>: null}
          $
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder='Price per night (USD)'
            name="price"
          />
        </label>
        <label>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          {errors.previewImage ? <div className="error-message">{errors.previewImage}</div>: null}
          <input
            type="text"
            onChange={(e) => setPreviewImage(e.target.value)}
            value={previewImage}
            placeholder='Preview Image URL'
            name='previewImage'
          />
        </label>
        <label>
          <p></p>{errors.firstSpotImg ? <div className="error-message">{errors.firstSpotImg}</div>: null}
          <input
            type="text"
            onChange={(e) => setFirstSpotImg(e.target.value)}
            value={firstSpotImg}
            placeholder='Image URL'
            name='firstSpotImg'
          />
        </label>
        <label>
          <p></p>{errors.secondSpotImg ? <div className="error-message">{errors.secondSpotImg}</div>: null}
          <input
            type="text"
            onChange={(e) => setSecondSpotImg(e.target.value)}
            value={secondSpotImg}
            placeholder='Image URL'
            name='secondSpotImg'
          />
        </label>
        <label>
          <p></p>{errors.thirdSpotImg ? <div className="error-message">{errors.thirdSpotImg}</div>: null}
          <input
            type="text"
            onChange={(e) => setThirdSpotImg(e.target.value)}
            value={thirdSpotImg}
            placeholder='Image URL'
            name='thirdSpotImg'
          />
        </label>
        <label>
          <p></p>{errors.fourthSpotImg ? <div className="error-message">{errors.fourthSpotImg}</div>: null}
          <input
            type="text"
            onChange={(e) => setFourthSpotImg(e.target.value)}
            value={fourthSpotImg}
            placeholder='Image URL'
            name='fourthSpotImg'
          />
        </label>
        <label>
          <p></p>
          <button type="submit">Create Spot</button>
        </label>
      </form>
    </div>
  );
}
}


export default UpdateSpot;
