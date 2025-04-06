

const ReviewCard = ({reviews}) => {


    const monthDate = new Date(reviews.createdAt);
    const monthTwoDigit = monthDate.getMonth();
    const year = monthDate.getFullYear();
    const monthNames = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }
    const month = monthNames[monthTwoDigit]



return (
    <div>
    <h3>{reviews.User.firstName}</h3>
    <h4>{month} {year}</h4>
    <p>{reviews.review}</p>
</div>
)


}

export default ReviewCard;
