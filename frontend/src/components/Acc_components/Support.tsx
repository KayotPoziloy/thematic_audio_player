import React from "react";
import "../../style_lk/Support.css";
import donateIcon from "../Acc_components/img/Support/img.png";
import mailIcon from "../Acc_components/img/Support/img_1.png";

export default function Support() {
    return (
        <div className="support-page">
            <div className="support-text">
                <h2>Дорогие друзья, благодарим Вас за использование нашего тематического аудиоплеера!</h2>
                <p>
                    Мы рады, что вы выбрали наш сервис для наслаждения любимыми композициями
                    и уникальными треками. Ваша поддержка мотивирует нас развивать проект
                    и добавлять новые функции для вашего удобства. Если у вас есть предложения
                    или вопросы, не стесняйтесь делиться с нами. Спасибо, что остаетесь с нами!
                </p>
            </div>
            <div className="support-buttons">
                <div className="support-option">
                    <img
                        src={donateIcon}
                        alt="Поддержать проект"
                        className="support-icon"
                    />
                    <span>ПОДДЕРЖАТЬ ПРОЕКТ</span>
                </div>
                <div className="support-option">
                    <img
                        src={mailIcon}
                        alt="Почта для Ваших писем"
                        className="support-icon"
                    />
                    <span>ПОЧТА ДЛЯ ВАШИХ ПИСЕМ</span>
                </div>
            </div>
        </div>
    );
}
