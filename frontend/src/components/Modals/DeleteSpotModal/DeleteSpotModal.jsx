import { useDispatch } from 'react-redux';
import '../../Modals/Modal.css';
import { useModal } from '../../../context/Modal';
import { deleteSpotThunk } from '../../../store/spots';




const DeleteSpotModal = (spotId) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleDelete = async () => {


    const data = await dispatch(deleteSpotThunk(spotId))
    console.log("Deleted spot ID:", data.id, spotId);
    closeModal();
        }

return (
    <>
    <button onClick={handleDelete}>Yes (Delete Spot)</button>
    <button onClick={closeModal}>No (Keep Spot)</button>
    </>
)
 
}


export default DeleteSpotModal;
