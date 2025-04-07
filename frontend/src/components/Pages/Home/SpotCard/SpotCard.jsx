export default function SpotCard ({spot}) {

  const avgRatingNum = spot.avgRating

  return (
    <div className="card-container">
      <div className='spot-image-container'>
        <img className='spot-image' src={spot.previewImage}></img>
      </div>
      <div className='title-container spot-text'>
        <span>{`${spot.city}, ${spot.state}`} </span>
        <span>{`${avgRatingNum}`} </span>

      </div>

      <div className='address-dates-container'>
        <p className='spot-text'>{spot.name}</p>
        <p className='spot-text'>Mar 31 - Apr 5</p>
      </div>

      <div className='price'>
        <span className="spot-text">{`$${spot.price} `}</span>
        <span className="spot-text">{`night`}</span>

      </div>


      </div>







      )}
