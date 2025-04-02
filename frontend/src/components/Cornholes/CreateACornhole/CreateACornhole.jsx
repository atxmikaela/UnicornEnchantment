
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCornholeThunk } from '../../../store/cornholes';





const CreateACornhole = () => {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [firstCornholeImg, setFirstCornholeImg] = useState("");
  const [secondCornholeImg, setSecondCornholeImg] = useState("");
  const [thirdCornholeImg, setThirdCornholeImg] = useState("");
  const [fourthCornholeImg, setFourthCornholeImg] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
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

    if (firstCornholeImg && !imageRegex.test(firstCornholeImg)) {
      newErrors.firstCornholeImg = 'Image URL must end in png, jpg, or jpeg';
    }

    if (secondCornholeImg && !imageRegex.test(secondCornholeImg)) {
      newErrors.secondCornholeImg = 'Image URL must end in png, jpg, or jpeg';
    }

    if (thirdCornholeImg && !imageRegex.test(thirdCornholeImg)) {
      newErrors.thirdCornholeImg = 'Image URL must end in png, jpg, or jpeg';
    }

    if (fourthCornholeImg && !imageRegex.test(fourthCornholeImg)) {
      newErrors.fourthCornholeImg = 'Image URL must end in png, jpg, or jpeg';
    }

    setErrors(newErrors);




    if (Object.keys(newErrors).length === 0) {
      const cornhole = {
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
        firstCornholeImg,
        secondCornholeImg,
        thirdCornholeImg,
        fourthCornholeImg,
      };


      dispatch(createCornholeThunk(cornhole))
      .then((data) => {
        console.log("Created cornhole ID:", data.id);
        reset();
        navigate(`/cornholes/${data.id}`);
      })
      .catch((err) => {
        console.error("Error creating cornhole:", err);
      })
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
    setFirstCornholeImg('');
    setSecondCornholeImg('');
    setThirdCornholeImg('');
    setFourthCornholeImg('');
  };

  return (
    <div className='inputBox'>
      <h1>Create your Cornhole</h1>
      <h2>Where&apos;s your cornhole located?</h2>
      <p>Guests will only get your exact address once they booked a reservation</p>
      <form onSubmit={handleSubmit}>
        <label>
        {errors.country && <div className="error-message">{errors.country}</div>}
          <input
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder='Country'
            name='country'
          />
        </label>
        <label>
        <p></p>{errors.address && <div className="error-message">{errors.address}</div>}
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder='Address'
            name='address'
          />
        </label>
        <label>
        <p></p>{errors.city && <div className="error-message">{errors.city}</div>}
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder='City'
            name='city'
          />
        </label>
        <label>
        <p></p>{errors.state && <div className="error-message">{errors.state}</div>}
          <input
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder='STATE'
            name='state'
          />
        </label>
        <label>
        <p></p>{errors.latitude && <div className="error-message">{errors.latitude}</div>}
          <input
            type="text"
            onChange={(e) => setLat(e.target.value)}
            value={lat}
            placeholder='Latitude'
            name='lat'
          />
        </label>
        <label>
        <p></p>{errors.longitude && <div className="error-message">{errors.longitude}</div>}
          <input
            type="text"
            onChange={(e) => setLng(e.target.value)}
            value={lng}
            placeholder='Longitude'
            name='lng'
          />
        </label>
        <label>
          <h2>Describe your cornhole to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wife or parking, and what you love about the cornhood.</p>
          {errors.description && <div className="error-message">{errors.description}</div>}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="textarea"
            placeholder='Description'
            rows='6'
          />
        </label>
        <label>
          <h2>Create a title for your cornhole</h2>
          <p>Catch guests&apos; attention with a cornhole title that highlights what makes your cornhole special.</p>
          {errors.name && <div className="error-message">{errors.name}</div>}
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder='Name of your cornhole'
            name='name'
          />
        </label>
        <label>
          <h2>Set a base price for your cornhole</h2>
          <p>Competitive pricing can help your cornhole stand out and rank higher in search results.</p>
          {errors.price && <div className="error-message">{errors.price}</div>}
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
          <h2>Liven up your cornhole with photos</h2>
          <p>Submit a link to at least one photo to publish your cornhole.</p>
          {errors.previewImage && <div className="error-message">{errors.previewImage}</div>}
          <input
            type="text"
            onChange={(e) => setPreviewImage(e.target.value)}
            value={previewImage}
            placeholder='Preview Image URL'
            name='previewImage'
          />
        </label>
        <label>
          <p></p>{errors.firstCornholeImg && <div className="error-message">{errors.firstCornholeImg}</div>}
          <input
            type="text"
            onChange={(e) => setFirstCornholeImg(e.target.value)}
            value={firstCornholeImg}
            placeholder='Image URL'
            name='firstCornholeImg'
          />
        </label>
        <label>
          <p></p>{errors.secondCornholeImg && <div className="error-message">{errors.secondCornholeImg}</div>}
          <input
            type="text"
            onChange={(e) => setSecondCornholeImg(e.target.value)}
            value={secondCornholeImg}
            placeholder='Image URL'
            name='secondCornholeImg'
          />
        </label>
        <label>
          <p></p>{errors.thirdCornholeImg && <div className="error-message">{errors.thirdCornholeImg}</div>}
          <input
            type="text"
            onChange={(e) => setThirdCornholeImg(e.target.value)}
            value={thirdCornholeImg}
            placeholder='Image URL'
            name='thirdCornholeImg'
          />
        </label>
        <label>
          <p></p>{errors.fourthCornholeImg && <div className="error-message">{errors.fourthCornholeImg}</div>}
          <input
            type="text"
            onChange={(e) => setFourthCornholeImg(e.target.value)}
            value={fourthCornholeImg}
            placeholder='Image URL'
            name='fourthCornholeImg'
          />
        </label>
        <label>
          <p></p>
          <button type="submit">Create Cornhole</button>
        </label>
      </form>
    </div>
  );
}


export default CreateACornhole;
