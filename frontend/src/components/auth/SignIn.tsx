import React from "react";

export default function SignIn(){
    return (
        <>
            <form>
                <h1 className="h3 mb-3 fw-normal">Вход</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="username" name="username" placeholder="Username"/>
                    <label htmlFor="floatingInput">Введите имя</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Введите пароль</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Войти</button>
            </form>
        </>
    );
}