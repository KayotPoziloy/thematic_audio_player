import React from "react";
import {Link} from "react-router-dom";
import {Dropdown} from "./DropdownMenu";

export default function Header() {
    return (
        <header>
            <nav className="navbar bg-secondary bg-opacity-50">
                <Dropdown/>
                <ul className="nav justify-content-end">
                    {/*<li className="nav-item"><DropdownMenuFavourites name="избранное"/></li>*/}
                    <li className="nav-item"><Link to="/account" className="nav-link text-white"><img src="/png/Profile.png" alt="Профиль"/></Link></li>
                </ul>
            </nav>
        </header>
    );
}