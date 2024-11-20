import React from "react";
import "./Playlists.scss"
import {usePlaylists} from "../../hooks/usePlaylists";

export const Playlists = () => {
    const {
        error,
        selectedPlaylist
    } = usePlaylists();

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