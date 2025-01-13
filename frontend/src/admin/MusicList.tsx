import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function MusicList() {
    const [playlists, setPlaylists] = useState<Array<{ id: number; name: string }>>([]);
    const [musics, setMusics] = useState<Array<{ id: number; playlist_id: number; name: string; author: string; filename: string; tag: string }>>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedMusic, setSelectedMusic] = useState<{ id: number; name: string; author: string; filename: string; tag: string } | null>(null);
    const [originalMusic, setOriginalMusic] = useState<{ id: number; name: string; author: string; filename: string; tag: string } | null>(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}api/music/playlists`);
                setPlaylists(response.data.playlists || []);
            } catch (err) {
                setError("Ошибка при загрузке плейлистов");
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    const fetchMusics = async (playlistId: number) => {
        try {
            setLoading(true);
            setSelectedPlaylist(playlistId);
            const response = await axios.post(`${API_URL}api/music/musics`, { id: playlistId }, { withCredentials: true });
            setMusics(response.data.musics || []);
        } catch (err) {
            setError("Ошибка при загрузке музыки" + err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateMusic = async (musicId: number, updatedData: { name: string; author: string; filename: string; tag: string }) => {
        try {
            setLoading(true);
            const response = await axios.put(`${API_URL}api/music/music`, { id: musicId, ...updatedData }, { withCredentials: true });
            const updatedMusic = response.data.music;
            setMusics(musics.map(music => (music.id === updatedMusic.id ? updatedMusic : music)));
            setSelectedMusic(null);
            setOriginalMusic(null);
        } catch (err) {
            setError("Ошибка при обновлении музыки" + err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMusic = async (musicId: number) => {
        try {
            setLoading(true);
            const response = await axios.delete(`${API_URL}api/music/music`, { data: { id: musicId }, withCredentials: true });
            const deletedMusic = response.data.deletedMusic;
            setMusics(musics.filter(music => music.id !== deletedMusic.id));
        } catch (err) {
            setError("Ошибка при удалении музыки" + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Список музыки</h2>
            <div className="columns">
                <div className="d-grid gap-2 text-center">
                    <h4>Плейлисты</h4>
                    <ul className="list-group">
                        {playlists.map((playlist) => (
                            <li
                                key={playlist.id}
                                className={`list-group-item ${selectedPlaylist === playlist.id ? "active" : ""}`}
                                onClick={() => fetchMusics(playlist.id)}
                                style={{ cursor: "pointer" }}
                            >
                                {playlist.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="table-responsive">
                    <h4>Музыка</h4>
                    {selectedPlaylist === null ? (
                        <p className="text-muted">Выберите плейлист, чтобы увидеть треки</p>
                    ) : musics.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Название</th>
                                <th>Автор</th>
                                <th>Файл</th>
                                <th>Теги</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {musics.map((music, index) => (
                                <tr key={music.id}>
                                    <td>{index + 1}</td>
                                    <td>{music.name}</td>
                                    <td>{music.author}</td>
                                    <td>{music.filename}</td>
                                    <td>{music.tag}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning w-100"
                                            onClick={() => {
                                                setSelectedMusic(music);
                                                setOriginalMusic({ ...music });
                                            }}
                                        >
                                            Редактировать
                                        </button>
                                        <button className="btn btn-danger w-100" onClick={() => handleDeleteMusic(music.id)}>
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-muted">Нет музыки в этом плейлисте</p>
                    )}
                </div>
            </div>

            {selectedMusic && (
                <div>
                    <h4>Редактировать музыку</h4>
                    <form
                        style={{ marginTop: '10px', marginBottom: '40px' }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateMusic(selectedMusic.id, {
                                name: selectedMusic.name,
                                author: selectedMusic.author,
                                filename: selectedMusic.filename,
                                tag: selectedMusic.tag,
                            });
                        }}
                    >
                        <div className="form-group">
                            <label>Название</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedMusic.name}
                                onChange={(e) => setSelectedMusic({ ...selectedMusic, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Автор</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedMusic.author}
                                onChange={(e) => setSelectedMusic({ ...selectedMusic, author: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Файл</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedMusic.filename}
                                onChange={(e) => setSelectedMusic({ ...selectedMusic, filename: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Теги</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedMusic.tag}
                                onChange={(e) => setSelectedMusic({ ...selectedMusic, tag: e.target.value })}
                            />
                        </div>
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success mt-3 w-100">Обновить</button>
                            <button
                                type="button"
                                className="btn btn-secondary mt-3 w-100"
                                onClick={() => {
                                    setSelectedMusic(null);
                                    setOriginalMusic(null);
                                }}
                            >
                                Закрыть
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
