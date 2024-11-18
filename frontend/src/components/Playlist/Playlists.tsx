import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchPlaylists } from "../../store/playlistSlice";
import "./Playlists.scss"

export const Playlists = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { playlists, selectedPlaylistId, error } = useSelector((state: RootState) => state.playlist);

    const selectedPlaylist = playlists.find(
        (playlist) => playlist.id === selectedPlaylistId
    );

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);

    return (
        <div className="playlists">
            {error && <p className="error">{error}</p>}

            {selectedPlaylist ? (
                <div className="playlist">
                    <img
                        src={selectedPlaylist.pic}
                        alt={`${selectedPlaylist.name} pic`}
                        className="playlist-pic rotating"
                    />
                    <h3>{selectedPlaylist.name}</h3>
                </div>
            ) : (
                <p>Выберите плейлист</p>
            )}
        </div>
    );
};