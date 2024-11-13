import React from "react";
import { Link } from "react-router-dom";
import {DropdownMenu, DropdownMenuFavourites} from "./DropdownMenu";

export default function Header() {
    return (
        <header
            className="bg-primary text-white d-flex flex-column flex-md-row align-items-center justify-content-between p-3">
            <nav className="d-flex flex-column flex-md-row">
                <DropdownMenu name="выбор"/>
                <DropdownMenuFavourites name="избранное"/>
                <Link to="/account" className="nav-link text-white">Аккаунт</Link>
            </nav>
        </header>
    );
}