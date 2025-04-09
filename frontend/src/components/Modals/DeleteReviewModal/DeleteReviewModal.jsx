import { useDispatch } from 'react-redux';
import '../../Modals/Modal.css';
import { useModal } from '../../../context/Modal';
import { deleteReviewThunk } from '../../../store/reviews';





const DeleteReviewModal = ({reviews}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();



    const handleDelete = async () => {


    await dispatch(deleteReviewThunk(reviews.id));
    closeModal();
        }


return (
    <>
    <h1>Confirm Delete</h1>
    <p>{"Are you sure you want to delete this Review"}</p>
    <button onClick={handleDelete}>Yes (Delete Review)</button>
    <button onClick={closeModal}>No (Keep Review)</button>
    </>
)

}


export default DeleteReviewModal;
