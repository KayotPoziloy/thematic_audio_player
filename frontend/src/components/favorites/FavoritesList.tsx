import React, { useEffect, useState } from 'react';
import { getLiked, removeLike } from '../../model/likeMusic';
export default function FavoritesList() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const [likedTracks, setLikedTracks] = useState<any[]>([]);

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

    return (
        <div className="d-flex justify-content-center w-100">
            <div style={{ position: 'relative', paddingBottom: '100px'}}>
                {likedTracks.length === 0 ? (
                    <p>Нет избранных треков.</p>
                ) : (
                    <div className="container">
                        <h3>Ваши избранные треки:</h3>
                        <div className="list-group">
                            {likedTracks.map((track) => (
                                <div key={track.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h5>{track.name}</h5>
                                            <p>{track.author}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveLike(track.id)}
                                        className="btn btn-danger w-25">Удалить</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
