import React, { useState } from "react";
import "../../style_lk/Settings.css";
import UserHeader from "./UserHeader";
import axios from "axios";

export default function Settings() {
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [loadingAvatar, setLoadingAvatar] = useState<boolean>(false);
    const [loadingBackground] = useState<boolean>(false);
    const [isEditPanelVisible, setIsEditPanelVisible] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [isNameSectionVisible, setIsNameSectionVisible] = useState<boolean>(false);
    const [isPasswordSectionVisible, setIsPasswordSectionVisible] = useState<boolean>(false);

    const handleChangePassword = async () => {
        try {
            await axios.put(
                "http://localhost:4000/api/user/update-password",
                {
                    oldPassword,
                    newPassword,
                },
                { withCredentials: true }
            );
            alert("Пароль успешно обновлен!");
            setOldPassword("");
            setNewPassword("");
        } catch (error: any) {
            console.error("Ошибка при обновлении пароля:", error);
            alert(
                (error.response?.data?.error?.msg as string) || "Не удалось обновить пароль."
            );
        }
    };

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

    // Обработчик сохранения имени пользователя
    const handleSaveUserName = async () => {
        try {
            await axios.put(
                "http://localhost:4000/api/user/update-name",
                { name: userName },
                { withCredentials: true }
            );
            alert("Имя пользователя успешно обновлено!");
        } catch (error) {
            console.error("Ошибка при обновлении имени пользователя:", error);
            alert("Не удалось обновить имя пользователя.");
        }
    };

    return (
        <div>
            <UserHeader avatarImage={avatarImage} backgroundImage={backgroundImage} />
            <div className="settings-page">
                <div className="settings-options">
                    {/* Добавить аватарку */}
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

                    {/* Добавить шапку */}
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

                    {/* Редактировать данные */}
                    <div className="option">
                        <button
                            className="settings-button"
                            onClick={() => setIsEditPanelVisible(!isEditPanelVisible)}
                        >
                            <img
                                src="/png_lk/Settings/img_2.png"
                                alt="Редактировать данные"
                                className="settings-icon"
                            />
                            <span>РЕДАКТИРОВАТЬ ДАННЫЕ</span>
                        </button>
                    </div>
                </div>

                {/* Сообщения загрузки */}
                {loadingAvatar && <p>Загрузка аватарки...</p>}
                {loadingBackground && <p>Загрузка фона...</p>}

                {/* Панель редактирования */}
                {isEditPanelVisible && (
                    <div className="edit-panel">
                        <h2 className="edit-panel-title">Редактировать данные</h2>

                        {/* Изменение имени */}
                        <div className="form-section">
                            <h3
                                className="collapsible-header"
                                onClick={() => setIsNameSectionVisible(!isNameSectionVisible)}
                            >
                                Имя пользователя
                            </h3>
                            {isNameSectionVisible && (
                                <div className="form-group">
                                    <label htmlFor="userName">Новое имя:</label>
                                    <input
                                        type="text"
                                        id="userName"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="Введите новое имя"
                                    />
                                    <button onClick={handleSaveUserName} className="btn-save">
                                        Сохранить имя
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Изменение пароля */}
                        <div className="form-section">
                            <h3
                                className="collapsible-header"
                                onClick={() => setIsPasswordSectionVisible(!isPasswordSectionVisible)}
                            >
                                Смена пароля
                            </h3>
                            {isPasswordSectionVisible && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="oldPassword">Текущий пароль:</label>
                                        <input
                                            type="password"
                                            id="oldPassword"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            placeholder="Введите текущий пароль"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newPassword">Новый пароль:</label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Введите новый пароль"
                                        />
                                    </div>
                                    <button onClick={handleChangePassword} className="btn-save">
                                        Сохранить пароль
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
