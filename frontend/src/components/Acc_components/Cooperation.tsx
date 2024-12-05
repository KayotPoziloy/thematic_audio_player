import React from "react";
import "../../style_lk/Cooperation.css";
import donateIcon from "../Acc_components/img/Cooperation/img.png";
import mailIcon from "../Acc_components/img/Cooperation/img_1.png";

export default function Cooperation() {
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
                <div className="support-option">
                    <img
                        src={donateIcon}
                        alt="Анкета для сотрудничества"
                        className="support-icon"
                    />
                    <span>АНКЕТА ДЛЯ СОТРУДНИЧЕТВА</span>
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
