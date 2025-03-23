import { isRouteErrorResponse } from "react-router-dom";







function CreateASpot() {
    return (
    <>
    <h1 >Create a new Spot</h1>;
    <h2>Where's your place located?</h2>
    <p>Guests will only get your exact address once they booked a reservation.</p>
    <p> </p>
    <Label>
      Country
      <input
        type="text"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        />
    </Label>
    <p>{errors.country}</p>
    <Label>
      Street Address
      <input
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        />
    </Label>
    <p>{errors.address}</p>
    <Label>
      City
      <input
        type="text"
        name="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        />
    </Label>
    <p>{errors.city}</p>
    <Label>
      State
      <input
        type="text"
        name="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
        />
    </Label>
    <p>{errors.state}</p>
    <Label>
      Latitude
      <input
        type="text"
        name="latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        />
    </Label>
    <p>{errors.latitude}</p>
    <Label>
      Longitude
      <input
        type="text"
        name="longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        />
    </Label>
    <p>{errors.longitude}</p>

    <h1>Describe your place to guests</h1>
    <Label>
    Mention the best features of your space, any special amenities like husks or old weird looking chunks of metal and any experiences late at night.
      <input
        type="textarea"
        placeholder="Please write at least 30 characters"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
    </Label>
    <h1>Create a title for your spot</h1>
    <Label>
      Catch guests' attention with a spot title that highlights what makes your place special!
      <input
        type="text"
        placeholder="Name of your spot"
        name="longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        />
    </Label>
    <p>{errors.longitude}</p>
    <p>{errors.longitude}</p>
    </>










    </>

    )
  }






export default CreateASpot;
