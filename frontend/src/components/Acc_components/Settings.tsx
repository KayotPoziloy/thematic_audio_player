import React, { useState } from "react";
import "../../style_lk/Settings.css";
import UserHeader from "./UserHeader";
import axios from "axios";

export default function Settings() {
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [loadingAvatar, setLoadingAvatar] = useState<boolean>(false);
    const [loadingBackground] = useState<boolean>(false);

    // Обработчик загрузки аватарки
    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const base64Image = reader.result as string;
            setAvatarImage(base64Image); // Для предварительного просмотра
            setLoadingAvatar(true);

            try {
                // Отправка данных на сервер
                await axios.put(
                    "http://localhost:4000/api/user/update-avatar",
                    { avatarUrl: base64Image },
                    { withCredentials: true }
                );
                alert("Аватарка успешно обновлена!");
            } catch (error) {
                console.error("Ошибка при загрузке аватарки:", error);
                alert("Не удалось обновить аватарку.");
            } finally {
                setLoadingAvatar(false);
            }
        };
        reader.readAsDataURL(file);
    };

    // Обработчик загрузки фона
    const handleBackgroundChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const base64Image = reader.result as string;
            setBackgroundImage(base64Image); // Для предварительного просмотра

            try {
                // Отправка данных на сервер
                await axios.put(
                    "http://localhost:4000/api/user/update-background",
                    { backgroundUrl: base64Image },
                    { withCredentials: true }
                );
                alert("Шапка успешно обновлена!");
            } catch (error) {
                console.error("Ошибка при загрузке шапки:", error);
                alert("Не удалось обновить шапку.");
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className="settings-page">
                <div className="settings-options">
                    <div className="option">
                        <label className="settings-button">
                            <img
                                src="/png_lk/Settings/img.png"
                                alt="Добавить фото пользователя"
                                className="settings-icon"
                            />
                            <span>ДОБАВИТЬ АВАТАРКУ</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>
                    <div className="option">
                        <label className="settings-button">
                            <img
                                src="/png_lk/Settings/img_1.png"
                                alt="Добавить шапку пользователя"
                                className="settings-icon"
                            />
                            <span>ДОБАВИТЬ ШАПКУ</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleBackgroundChange}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>
                    <div className="option">
                        <button className="settings-button">
                            <img
                                src="/png_lk/Settings/img_2.png"
                                alt="Редактировать данные"
                                className="settings-icon"
                            />
                            <span>РЕДАКТИРОВАТЬ ДАННЫЕ</span>
                        </button>
                    </div>
                </div>
                {loadingAvatar && <p>Загрузка аватарки...</p>}
                {loadingBackground && <p>Загрузка фона...</p>}
            </div>
        </div>
    );
}
