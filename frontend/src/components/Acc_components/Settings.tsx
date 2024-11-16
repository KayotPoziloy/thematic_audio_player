import React, { useState } from "react";
import "../../style_lk/Settings.css";
import UserHeader from "./UserHeader";
import avatarIcon from ".././Acc_components/img/Settings/img.png";
import backgroundIcon from ".././Acc_components/img/Settings/img_1.png";
import editIcon from ".././Acc_components/img/Settings/img_2.png";

// Остальной код...



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
                            <img src={avatarIcon} alt="Добавить фото пользователя" className="settings-icon" />
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
                            <img src={backgroundIcon} alt="Добавить шапку пользователя" className="settings-icon" />
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
                            <img src={editIcon} alt="Редактировать данные" className="settings-icon" />
                            <span>РЕДАКТИРОВАТЬ ДАННЫЕ</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
