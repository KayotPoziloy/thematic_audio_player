import {useDispatch} from "react-redux";
import {AppDispatch} from "../reducers";
import {changePlaylist} from "../reducers/playlistSlice";

export const useDropdown = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSelect = (playlistId: number) => {
        dispatch(changePlaylist(playlistId));
    };

    return {handleSelect}
}