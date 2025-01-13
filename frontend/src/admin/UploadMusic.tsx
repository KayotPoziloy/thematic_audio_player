import React, { useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function UploadMusic() {
    const [formData, setFormData] = useState({
        playlist_id: "",
        name: "",
        author: "",
        filename: "",
        tag: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.name === "image") {
                setImageFile(e.target.files[0]);
            } else if (e.target.name === "audio") {
                setAudioFile(e.target.files[0]);
                setFormData((prevData) => ({ ...prevData, filename: e.target.files![0].name }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setMessage(null);

            let uploadedFilename = formData.filename;

            if (audioFile) {
                const audioData = new FormData();
                audioData.append("file", audioFile);
                const audioResponse = await axios.post(`${API_URL}api/music/upload`, audioData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                });

                uploadedFilename = audioResponse.data.filename;
                console.log("Audio uploaded:", uploadedFilename);
            }

            const musicResponse = await axios.post(
                `${API_URL}api/music/music`,
                {
                    ...formData,
                    playlist_id: parseInt(formData.playlist_id, 10),
                    filename: uploadedFilename, // Передаем модифицированное имя
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            setMessage("Музыка успешно загружена");

            setFormData({ playlist_id: "", name: "", author: "", filename: "", tag: "" });
            setImageFile(null);
            setAudioFile(null);

            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }
            if (audioInputRef.current) {
                audioInputRef.current.value = "";
            }
        } catch (error) {
            setMessage("Ошибка при загрузке: " + (error as Error).message);
        }
    };

    return (
        <div style={{ margin: '-75px', position: 'inherit' }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <p className="text-center">Добавление музыки</p>
                    <input
                        type="number"
                        name="playlist_id"
                        value={formData.playlist_id}
                        onChange={handleInputChange}
                        placeholder="Введите playlist_id"
                        className="form-control"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        className="form-control"
                        placeholder="Введите name"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        className="form-control"
                        placeholder="Введите author"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="filename"
                        value={formData.filename}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Имя файла заполняется автоматически"
                        readOnly
                        required
                    />
                </div>
                <div>
                    <textarea
                        name="tag"
                        value={formData.tag}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Введите tag (JSON формат, пример: {})"
                        required
                    />
                </div>
                <div>
                    <p>Музыка</p>
                    <input
                        type="file"
                        name="audio"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="form-control"
                        ref={audioInputRef}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">Добавить</button>
            </form>

            {message && (
                <div className="mt-3">
                    <p className="text-center">{message}</p>
                </div>
            )}
        </div>
    );
}
