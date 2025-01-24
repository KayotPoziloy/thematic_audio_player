import React, { useEffect, useState } from 'react';
import { getLiked, removeLike } from '../../model/likeMusic';
import {useNavigate} from "react-router-dom";
import {playTrack} from "../../reducers/audioSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../reducers";
import {changePlaylist} from "../../reducers/playlistSlice";
export default function FavoritesList() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const [likedTracks, setLikedTracks] = useState<any[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const tracks = useSelector((state: RootState) => state.audio.tracks);

    useEffect(() => {
        const fetchLikedTracks = async () => {
            try {
                const tracks = await getLiked();
                setLikedTracks(tracks);
            } catch (error) {
                console.error("Ошибка при загрузке треков", error);
            }
        };

        fetchLikedTracks();
    }, []);

    const handleRemoveLike = async (trackId: number) => {
        try {
            // @ts-expect-error: ...
            await removeLike(trackId);
            setLikedTracks(prevTracks => prevTracks.filter(track => track.id !== trackId));
            window.location.reload();
        } catch (error) {
            console.error("Ошибка при удалении лайка", error);
        }
    };

    const handleStartLikedTrack = async (trackId: any, playlist_id: any) => {
        dispatch(changePlaylist(playlist_id));
        const trackIndex = tracks.findIndex((track) => track.id === trackId);

        if (trackIndex !== -1) {
            dispatch(playTrack(trackIndex));
        }
    }

    return (
        <div className="d-flex justify-content-center w-100">
            <div style={{position: 'relative', paddingBottom: '100px'}}>
                {likedTracks.length === 0 ? (
                    <div>
                        <p>Нет избранных треков.</p>
                        <button className="btn btn-warning w-100" onClick={() => navigate(-1)}>Назад</button>
                    </div>
                ) : (
                    <div className="container">
                        <h3>Ваши избранные треки:</h3>
                        <div className="list-group">
                            {likedTracks.map((track) => (
                                <div key={track.id}
                                     className="list-group-item d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h5>{track.name}</h5>
                                            <p>{track.author}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-primary w-50"
                                            onClick={() => handleStartLikedTrack(track.id, track.playlist_id)}
                                        >
                                            Выбрать
                                        </button>
                                        <button
                                            onClick={() => handleRemoveLike(track.id)}
                                            className="btn btn-danger w-50"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-2 d-flex justify-content-center">
                            <button className="btn btn-warning" onClick={() => navigate(-1)}>Назад</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
