import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/reducers";
import {changePlaylist} from "../redux/reducers/playlistSlice";

export const useDropdown = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSelect = (playlistId: number) => {
        dispatch(changePlaylist(playlistId));
    };

    return {handleSelect}
}