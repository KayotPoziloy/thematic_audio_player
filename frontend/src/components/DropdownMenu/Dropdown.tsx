import React from "react";
import {useDispatch} from "react-redux";
import { setSelectedPlaylist } from "../../store/playlistSlice";
import "./Dropdown.css"


export default function Dropdown() {
    const dispatch = useDispatch();

    const handleSelect = (playlistId: number) => {
        console.log(playlistId)
        dispatch(setSelectedPlaylist(playlistId));
    };

    return (
        <div
            className="dropdown">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false"><img className="dropdown-img" src={"../png/Dropdown.png"} alt={"выбор"}/>
            </button>
            <ul className="dropdown-menu bg-secondary bg-opacity-50">
                <li className="dropend">
                    <a className="btn dropdown-toggle dropdown-item" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">Игры</a>
                    <ul className="dropdown-menu bg-secondary bg-opacity-50">
                        <li className="dropdown-item" onClick={() => handleSelect(1)}>
                            <a>Gta 5</a>
                        </li>
                        <li className="dropdown-item" onClick={() => handleSelect(2)}>
                            <a>Nfs</a>
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
