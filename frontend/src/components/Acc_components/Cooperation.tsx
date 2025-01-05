import React, { useState } from "react";
import StationOrderForm from "./StationOrderForm";
import "../../style_lk/Cooperation.css";

export default function Cooperation() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="support-page">
            <div className="support-text">
                <h2>Станьте нашим партнером и создайте уникальную радиоволну!</h2>
                <p>
                    Мы предлагаем возможность создать персонализированную радиостанцию под Ваши
                    индивидуальные потребности. Независимо от тематики или жанра, мы поможем воплотить
                    Вашу идею в жизнь. Наша команда готова работать с Вами над созданием эксклюзивного
                    контента, который будет радовать ваших слушателей. Заполните анкету, и мы свяжемся с
                    вами для обсуждения всех деталей. Давайте вместе создадим нечто уникальное!
                </p>
            </div>
            <div className="support-buttons">
                <div className="support-option" onClick={() => setIsFormOpen(true)}>
                    <img
                        src="/png_lk/Cooperation/img.png"
                        alt="Анкета для сотрудничества"
                        className="support-icon"
                    />
                    <span>АНКЕТА ДЛЯ СОТРУДНИЧЕСТВА</span>
                </div>
                <div className="support-option">
                    <img
                        src="/png_lk/Cooperation/img_1.png"
                        alt="Почта для Ваших писем"
                        className="support-icon"
                    />
                    <span>ПОЧТА ДЛЯ ВАШИХ ПИСЕМ</span>
                </div>
            </div>

            {isFormOpen && <StationOrderForm onClose={() => setIsFormOpen(false)} />}
        </div>
    );
}
