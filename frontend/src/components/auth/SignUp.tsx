import React, {useState} from "react";
import {signup} from "../../redux/actions/user";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/reducers";
import {useNavigate} from "react-router-dom";

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setError("Пароли не совпадают");
            return;
        }

        setError("");
        dispatch(signup(email, password, name, navigate));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="email" name="email"
                           placeholder="Password" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <label htmlFor="floatingPassword">Введите почту</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="password" name="password"
                           placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Введите пароль</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm"
                           placeholder="Password" value={passwordConfirm} onChange={(e)=> setPasswordConfirm(e.target.value)}/>
                    <label htmlFor="floatingPassword">Повторите пароль</label>
                </div>

                <div className="form-floating">
                    <input type="text" className="form-control" id="name" name="name"
                           placeholder="name" value={name} onChange={(e)=> setName(e.target.value)}/>
                    <label htmlFor="floatingInput">Введите имя пользователя</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Зарегистрироваться</button>

                {error && <div className="text-danger">{error}</div>}
            </form>
        </>
    );
}