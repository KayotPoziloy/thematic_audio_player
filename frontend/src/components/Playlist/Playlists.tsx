import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchPlaylists } from "../../store/playlistSlice";
import "./Playlists.css"

export const Playlists = () => {
    const dispatch = useDispatch();
    const { playlists, error } = useSelector((state: RootState) => state.playlist);

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);

    console.log(playlists)

    return (
        <div className="playlists">
            {error && <p className="error">{error}</p>}

            {playlists.map((playlist) => (
                <div key={playlist.id} className="playlist">
                    <img src={playlist.pic} alt={`${playlist.name} pic`} className="playlist-pic" />
                    <div
                        className="playlist-background"
                        style={{ backgroundImage: `url(${playlist.background})` }}
                    />
                    <h3>{playlist.name}</h3>
                </div>
            ))}
        </div>
    );
};