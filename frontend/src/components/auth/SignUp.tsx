import React, { useState } from "react";
import { signup } from "../../model";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reducers";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [authError, setAuthError] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setConfirmError("Пароли не совпадают");
            return;
        }

        setConfirmError("");
        // @ts-expect-error 'type'
        const request: string | null = await dispatch(signup(email, password, name, navigate));

        if (request && request.startsWith("Ошибка:")) {
            setAuthError(request);
        } else {
            setAuthError("");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="email" name="email"
                           placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <label htmlFor="email">Введите почту</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="password" name="password"
                           placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <label htmlFor="password">Введите пароль</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm"
                           placeholder="Password" value={passwordConfirm} onChange={(e)=> setPasswordConfirm(e.target.value)}/>
                    <label htmlFor="passwordConfirm">Повторите пароль</label>
                </div>

                <div className="form-floating">
                    <input type="text" className="form-control" id="name" name="name"
                           placeholder="name" value={name} onChange={(e)=> setName(e.target.value)}/>
                    <label htmlFor="name">Введите имя пользователя</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Зарегистрироваться</button>

                {confirmError && <div className="text-danger">{confirmError}</div>}
                {authError && <div className="text-danger">{authError}</div>}
            </form>
        </>
    );
}
