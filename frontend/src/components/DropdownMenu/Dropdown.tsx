import React from "react";
import "./Dropdown.css"
import { useDropdown } from "../../hooks/useDropdown";

export default function Dropdown() {
    const {handleSelect} = useDropdown();

    return (
        <div
            className="dropdown">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                <img className="dropdown-img" src={"/png/Dropdown.png"} alt={"выбор"}/>
            </button>
            <ul className="dropdown-menu bg-secondary bg-opacity-50">
                <li className="dropend">
                    <a className="btn dropdown-toggle dropdown-item" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        Игры
                    </a>
                    <ul className="dropdown-menu bg-secondary bg-opacity-50">
                        <li className="dropdown-item" onClick={() => handleSelect(1)}>
                            <a>GTA 5</a>
                        </li>
                        <li className="dropdown-item" onClick={() => handleSelect(2)}>
                            <a>NFS RIVALS</a>
                        </li>
                        <li className="dropdown-item" onClick={() => handleSelect(3)}>
                            <a>THE WITCHER</a>
                        </li>
                    </ul>
                </li>
                <li className="dropend">
                    <a className="btn dropdown-toggle dropdown-item" data-bs-toggle="dropdown"
                       aria-expanded="false">Фильмы</a>
                    <ul className="dropdown-menu bg-secondary bg-opacity-50">
                        <li className="dropdown-item"><a>Тарантино</a></li>
                        <li className="dropdown-item"><a>Гай Ричи</a></li>
                    </ul>
                </li>
                <li className="dropend">
                    <a className="btn dropdown-toggle dropdown-item" data-bs-toggle="dropdown"
                       aria-expanded="false">Сериалы</a>
                    <ul className="dropdown-menu bg-secondary bg-opacity-50">
                        <li className="dropdown-item"><a>Сопрано</a></li>
                        <li className="dropdown-item"><a>Во все тяжкие</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}