import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {signin} from "../../redux/actions/user";
import {AppDispatch} from "../../redux/reducers";
import {useNavigate} from "react-router-dom";
import "./SignIn.css";


export default function SignIn(){
    const [login, setLogin]= useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // @ts-expect-error 'type'
        const request: string | null = await dispatch(signin(login, password, navigate));

        if (request && request.startsWith("Ошибка:")) {
            setAuthError(request);
        } else {
            setAuthError("");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Вход</h1>

                <div className="mb-3">
                    <input type="text" className="form-control" id="username" name="username" placeholder="Введите почту" value={login} onChange={(e)=> setLogin(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Введите пароль" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Войти</button>
                {authError && <div className="text-danger">{authError}</div>}
            </form>
        </>
    );
}
