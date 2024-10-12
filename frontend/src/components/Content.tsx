import React from "react";
import {Route} from "react-router-dom";
import {Routes} from "react-router";
import Main from "./Main";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Account from "./Account";

export default function Content() {
    return (
        <main className="bg-light flex-grow-1 d-flex align-items-center justify-content-center">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/account" element={<Account/>}/>
            </Routes>
        </main>
    );
}