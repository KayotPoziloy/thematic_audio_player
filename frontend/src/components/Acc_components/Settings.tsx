import React from "react";
import "../../style_lk/Account.css"; // Подключение CSS, если нужно

export default function Settings() {
    return (
        <div className="settings-page">
            <h2>Настройки профиля</h2>
            <div className="settings-options">
                <div className="option">
                    <button className="btn btn-outline-primary">
                        Добавить фото пользователя
                    </button>
                </div>
                <div className="option">
                    <button className="btn btn-outline-secondary">
                        Добавить шапку пользователя
                    </button>
                </div>
                <div className="option">
                    <button className="btn btn-outline-success">
                        Редактировать данные
                    </button>
                </div>
            </div>
        </div>
    );
}
