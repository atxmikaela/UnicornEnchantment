import { useDispatch } from 'react-redux';
import '../../Modals/Modal.css';
import { useModal } from '../../../context/Modal';
import { deleteSpotThunk } from '../../../store/spots';
import SpotCard from '../../Pages/Home/SpotCard';



const DeleteSpotModal = (spotId) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleDelete = async () => {


    const data = await dispatch(deleteSpotThunk(spotId));
    console.log(data, SpotCard)
    closeModal();
        }

return (
    <>
    <h1>Confirm Delete</h1>
    <p>{"Are you sure you want to remove this spot from the listings?"}</p>
    <button onClick={handleDelete}>Yes (Delete Spot)</button>
    <button onClick={closeModal}>No (Keep Spot)</button>
    </>
)

}


export default DeleteSpotModal;
