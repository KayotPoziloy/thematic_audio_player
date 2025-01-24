import React, { useState } from "react";
import "../../style_lk/Settings.css";
import axios from "axios";

export default function Settings({ onUpdateUser }: { onUpdateUser: (data: { avatar?: string; background?: string; name?: string }) => void }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [loadingAvatar, setLoadingAvatar] = useState<boolean>(false);
    const [loadingBackground] = useState<boolean>(false);
    const [isEditPanelVisible, setIsEditPanelVisible] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [activeSection, setActiveSection] = useState<string | null>(null); // Track active section


    const handleChangePassword = async () => {
        try {
            await axios.put(
                "http://localhost:4000/api/user/update-password",
                { oldPassword, newPassword },
                { withCredentials: true }
            );
            alert("Пароль успешно обновлен!");
            setOldPassword("");
            setNewPassword("");
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.error?.msg) {
                alert(error.response.data.error.msg);
            } else {
                console.error("Ошибка при обновлении пароля:", error);
                alert("Не удалось обновить пароль.");
            }
        }
    };

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const base64Image = reader.result as string;
            setAvatarImage(base64Image);
            setLoadingAvatar(true);

            try {
                await axios.put(
                    "http://localhost:4000/api/user/update-avatar",
                    { avatarUrl: base64Image },
                    { withCredentials: true }
                );
                onUpdateUser({ avatar: base64Image }); // Обновляем состояние в `UserHeader`
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


    const handleBackgroundChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const base64Image = reader.result as string;
            setBackgroundImage(base64Image);

            try {
                await axios.put(
                    "http://localhost:4000/api/user/update-background",
                    { backgroundUrl: base64Image },
                    { withCredentials: true }
                );
                onUpdateUser({ background: base64Image }); // Обновляем состояние в `UserHeader`
                alert("Шапка успешно обновлена!");
            } catch (error) {
                console.error("Ошибка при загрузке шапки:", error);
                alert("Не удалось обновить шапку.");
            }
        };
        reader.readAsDataURL(file);
    };


    const handleSaveUserName = async () => {
        try {
            await axios.put(
                "http://localhost:4000/api/user/update-name",
                { name: userName },
                { withCredentials: true }
            );
            onUpdateUser({ name: userName }); // Обновляем состояние в `UserHeader`
            alert("Имя пользователя успешно обновлено!");
        } catch (error) {
            console.error("Ошибка при обновлении имени пользователя:", error);
            alert("Не удалось обновить имя пользователя.");
        }
    };

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
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
                            <span tabIndex={0}>ДОБАВИТЬ АВАТАРКУ</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>

                    {/* Add Background */}
                    <div className="option">
                        <label className="settings-button">
                            <img
                                src="/png_lk/Settings/img_1.png"
                                alt="Добавить шапку пользователя"
                                className="settings-icon"
                            />
                            <span tabIndex={0}>ДОБАВИТЬ ШАПКУ</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleBackgroundChange}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>
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
                            <span tabIndex={0}>РЕДАКТИРОВАТЬ ДАННЫЕ</span>
                        </button>
                    </div>
                </div>

                {loadingAvatar && <p>Загрузка аватарки...</p>}
                {loadingBackground && <p>Загрузка фона...</p>}

                {/* Edit Panel */}
                {isEditPanelVisible && (
                    <div className="unique-edit-panel" tabIndex={0}>
                        {/* Кнопка закрытия */}
                        <button
                            className="unique-close-button"
                            onClick={() => setIsEditPanelVisible(false)}
                            aria-label="Close"
                            tabIndex={0}
                        >
                            &times;
                        </button>

                        <h2 className="edit-panel-title">Редактировать данные</h2>

                        {/* Edit Username */}
                        <div className="unique-form-section">
                            <h3
                                className="unique-collapsible-header"
                                onClick={() => toggleSection("name")}
                                tabIndex={0}
                            >
                                Имя пользователя
                            </h3>
                            {activeSection === "name" && (
                                <div className="unique-form-group">
                                    <input
                                        type="text"
                                        id="userName"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="Введите новое имя"
                                        tabIndex={0}
                                    />
                                    <button
                                        onClick={handleSaveUserName}
                                        className="unique-btn-save"
                                        tabIndex={0}
                                    >
                                        Сохранить имя
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Change Password */}
                        <div className="unique-form-section">
                            <h3
                                className="unique-collapsible-header"
                                onClick={() => toggleSection("password")}
                                tabIndex={0}
                            >
                                Смена пароля
                            </h3>
                            {activeSection === "password" && (
                                <div>
                                    <div className="unique-form-group">
                                        <input
                                            type="password"
                                            id="oldPassword"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            placeholder="Введите текущий пароль"
                                            tabIndex={0}
                                        />
                                    </div>
                                    <div className="unique-form-group">
                                        <input
                                            type="password"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Введите новый пароль"
                                            tabIndex={0}
                                        />
                                    </div>
                                    <button
                                        onClick={handleChangePassword}
                                        className="unique-btn-save"
                                        tabIndex={0}
                                    >
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
