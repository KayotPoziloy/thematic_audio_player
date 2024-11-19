import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {changePlaylist} from "../store/playlistSlice";

export const useDropdown = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSelect = (playlistId: number) => {
        dispatch(changePlaylist(playlistId));
    };

    return {handleSelect}
}