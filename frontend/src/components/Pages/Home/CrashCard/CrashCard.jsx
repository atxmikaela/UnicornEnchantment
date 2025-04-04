import './CrashCard.css';


export default function CrashCard ({cornhole}) {



  let avgRating2d;

if (cornhole.avgRating !== null) {
  avgRating2d = cornhole.avgRating
} else {
  cornhole.avgRating = "New";
}




  return (
    <div className="card-container">
      <div className='spot-image-container'>
        <img className='spot-image' src={cornhole.previewImage}></img>
      </div>
      <div className='title-container spot-text'>
        <span>{`${cornhole.city}, ${cornhole.state}`} </span>
        <span>{`${avgRating2d}`} </span>

      </div>

      <div className='address-dates-container'>
        <p className='spot-text'>{cornhole.name}</p>
        <p className='spot-text'>Mar 31 - Apr 5</p>
      </div>

      <div className='price'>
        <span className="spot-text">{`$${cornhole.price} `}</span>
        <span className="spot-text">{`night`}</span>

      </div>

</div>

      )
    }
