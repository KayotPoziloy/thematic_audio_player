import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchPlaylists } from "../../store/playlistSlice";
import "./Playlists.scss"

export const Playlists = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { playlists, error } = useSelector((state: RootState) => state.playlist);

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);

    return (
        <div className="playlists">
            {error && <p className="error">{error}</p>}

            {playlists.map((playlist) => (
                <div key={playlist.id} className="playlist">
                    <img src={playlist.pic} alt={`${playlist.name} pic`} className="playlist-pic rotating" />
                    <h3>{playlist.name}</h3>
                </div>
            ))}
        </div>
    );
};