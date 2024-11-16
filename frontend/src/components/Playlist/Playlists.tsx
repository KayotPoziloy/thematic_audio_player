import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchPlaylists } from "../../store/playlistSlice";
import "./Playlists.css"

export const Playlists = () => {
    const dispatch = useDispatch<any>();
    const { playlists, error } = useSelector((state: RootState) => state.playlist);

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);

    return (
        <div className="playlists">
            {error && <p className="error">{error}</p>}

            {playlists.map((playlist) => (
                <div key={playlist.id} className="playlist">
                    <img src={playlist.pic} alt={`${playlist.name} pic`} className="playlist-pic" />
                    <h3>{playlist.name}</h3>
                </div>
            ))}
        </div>
    );
};