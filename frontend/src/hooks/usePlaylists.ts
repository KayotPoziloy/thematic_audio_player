import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import {useEffect} from "react";
import {fetchPlaylists} from "../store/playlistSlice";

export const usePlaylists = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { playlists, selectedPlaylistId, error } = useSelector((state: RootState) => state.playlist);

    const selectedPlaylist = playlists.find(
        (playlist) => playlist.id === selectedPlaylistId
    );

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);

    return {error, selectedPlaylist}
}

