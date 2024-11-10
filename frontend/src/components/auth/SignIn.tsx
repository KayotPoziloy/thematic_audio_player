import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {signin} from "../../redux/actions/user";
import {AppDispatch} from "../../redux/reducers";
import {useNavigate} from "react-router-dom";


export default function SignIn(){
    const [login, setLogin]= useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // @ts-ignore
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

                <div className="form-floating">
                    <input type="text" className="form-control" id="username" name="username" placeholder="Username" value={login} onChange={(e)=> setLogin(e.target.value)}/>
                    <label htmlFor="username">Введите почту</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <label htmlFor="password">Введите пароль</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Войти</button>
                {authError && <div className="text-danger">{authError}</div>}
            </form>
        </>
    );
}