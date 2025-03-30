import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addSpotThunk } from '../../../store/spot';




const CreateASpot = () => {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState([]);
  const [firstSpotImg, setFirstSpotImg] = useState([]);
  const [secondSpotImg, setSecondSpotImg] = useState([]);
  const [thirdSpotImg, setThirdSpotImg] = useState([]);
  const [fourthSpotImg, setFourthSpotImg] = useState([]);
  const dispatch = useDispatch();



  const handleSubmit = (e) => {
    e.preventDefault();
    const spot ={
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

    dispatch(addSpotThunk(spot));
    reset();
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

    // if (country.length !== 0);
    // else if (address.length !== 0);
    // else if (city.length !== 0);
    // else if (state.length !== 0);
    // else if (description.length > 30);
    // else if (name.length !== 0);
    // else if (price.length !== 0);
    // else if (previewImage.length !== 0) {
    //       country,
    //       address,
    //       city,
    //       state,
    //       latitude,
    //       longitude,
    //       description,
    //       name,
    //       price,
    //       previewImage,
    //       firstSpotImg,
    //       secondSpotImg,
    //       thirdSpotImg,
    //       fourthSpotImg
    //     })




  return (
    <div className='inputBox'>
      <h1>Create a new Cornhole</h1>
      <h2>Where&apos;s your place located?</h2>
      <p>Guests will only get your exact address once they booked a reservation</p>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Country</p>
          <input
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            placeholder='Country'
            name='country'
            required
          />
        </label>
        <label>
          <p>Address</p>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder='Address'
            name='address'
            required
          />
        </label>
        <label>
          <p>City</p>
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder='City'
            name='city'
            required
          />
        </label>
        <label>
          <p>State</p>
          <input
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder='STATE'
            name='state'
            required
          />
        </label>
        <label>
          <p>Latitude</p>
          <input
            type="text"
            onChange={(e) => setLat(e.target.value)}
            value={lat}
            placeholder='Latitude'
            name='lat'
          />
        </label>
        <label>
        <p>Longitude</p>
          <input
            type="text"
            onChange={(e) => setLng(e.target.value)}
            value={lng}
            placeholder='Longitude'
            name='lng'
          />
        </label>
        <label>
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wife or parking, and what you love about the neighborhood.</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="textarea"
            placeholder='Description'
            rows='6'
            required
          />
        </label>
        <label>
          <h2>Create a title for your spot</h2>
          <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder='Name of your spot'
            name='name'
            required
          />
        </label>
        <label>
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          $
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder='Price per night (USD)'
            name="price"
            required
          />
        </label>
        <label>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            onChange={(e) => setPreviewImage(e.target.value)}
            value={previewImage}
            placeholder='Preview Image URL'
            name='previewImage'
            required
          />
        </label>
        <label>
          <p></p>
        <input
            type="text"
            onChange={(e) => setFirstSpotImg(e.target.value)}
            value={firstSpotImg}
            placeholder='Image URL'
            name='firstSpotImg'

          />
        </label>
        <label>
          <p></p>
        <input
            type="text"
            onChange={(e) => setSecondSpotImg(e.target.value)}
            value={secondSpotImg}
            placeholder='Image URL'
            name='secondSpotImg'

          />
        </label>
        <label>
          <p></p>
        <input
            type="text"
            onChange={(e) => setThirdSpotImg(e.target.value)}
            value={thirdSpotImg}
            placeholder='Image URL'
            name='thirdSpotImg'

          />
        </label>
        <label>
          <p></p>
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


export default CreateASpot;
