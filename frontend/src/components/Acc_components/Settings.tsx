import React, { useState } from "react";
import "../../style_lk/Account.css";
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
                        <label className="btn btn-outline-primary">
                            Добавить фото пользователя
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>
                    <div className="option">
                        <label className="btn btn-outline-secondary">
                            Добавить шапку пользователя
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleBackgroundChange}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>
                    <div className="option">
                        <button className="btn btn-outline-success">
                            Редактировать данные
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
