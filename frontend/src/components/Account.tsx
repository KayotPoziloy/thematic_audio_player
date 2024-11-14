import React from "react";

export default function Account(){
    return (
        <div className="flex-column">
            <div className="container mp-5">
                <div className="row mp-5">

                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <img
                            src="https://thumbs.dreamstime.com/b/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-%D1%81%D0%BC%D0%B8-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E-176256935.jpg"
                            alt="Аватар пользователя"
                            className="img-fluid rounded-circle"
                            style={{width: '150px', height: '150px'}}
                        />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-center">
                        <h3>Имя: Иван</h3>
                        <p>Email: ivanov@example.com</p>
                        <p>Телефон: +7 (123) 456-78-90</p>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-6">
                            <button className="btn btn-primary w-100 py-3">Настройки</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-secondary w-100 py-3">Список друзей</button>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <button className="btn btn-success w-100 py-3">Помощь</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger w-100 py-3">Поддержать проект</button>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-6">
                            <button className="btn btn-info w-100 py-3">Конфедициальность
                            </button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-warning w-100 py-3">Избранное</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}