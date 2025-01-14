import React, { useState } from "react";
import "../../style_lk/Settings.css";
import UserHeader from "./UserHeader";

export default function Settings() {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);

    // Обработчик для загрузки фона
    const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setBackgroundImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Обработчик для загрузки аватара
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <UserHeader backgroundImage={backgroundImage} avatarImage={avatarImage} />
            <div className="settings-page">
                <div className="settings-options">
                    <div className="option">
                        <label className="settings-button">
                            <img
                                src="/png_lk/Settings/img.png" // Абсолютный путь
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
                                src="/png_lk/Settings/img_1.png" // Абсолютный путь
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
                                src="/png_lk/Settings/img_2.png" // Абсолютный путь
                                alt="Редактировать данные"
                                className="settings-icon"
                            />
                            <span>РЕДАКТИРОВАТЬ ДАННЫЕ</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
