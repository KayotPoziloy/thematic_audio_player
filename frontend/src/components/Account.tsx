import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style_lk/Account.css";
import UserHeader from "./Acc_components/UserHeader";

export default function Account() {
    const navigate = useNavigate();
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);

    return (
        <div>
            <UserHeader backgroundImage={backgroundImage} avatarImage={avatarImage} /> {/* Передаем оба параметра */}

            <div className="account-button-section">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-6">
                            <button
                                className="btn btn-primary w-100 py-3"
                                onClick={() => navigate("/settings")}
                            >
                                НАСТРОЙКИ ПРОФИЛЯ
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                className="btn btn-secondary w-100 py-3"
                                onClick={() => navigate("/friends")}
                            >
                                СПИСОК ДРУЗЕЙ
                            </button>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <button
                                className="btn btn-success w-100 py-3"
                                onClick={() => navigate("/help")}
                            >
                                ПАРТНЕРСТВО
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                className="btn btn-danger w-100 py-3"
                                onClick={() => navigate("/support")}
                            >
                                ПОДДЕРЖКА ПРОЕКТА
                            </button>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <button
                                className="btn btn-info w-100 py-3"
                                onClick={() => navigate("/privacy")}
                            >
                                АВТОРСКИЕ ПРАВА
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                className="btn btn-warning w-100 py-3"
                                onClick={() => navigate("/favorites")}
                            >
                                ВЫХОД ИЗ АККАУНТА
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
