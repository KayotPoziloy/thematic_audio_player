import React from "react";

export default function SignUp(){
    return (
        <>
            <form>
                <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="username" name="username" placeholder="Username"/>
                    <label htmlFor="floatingInput">Введите имя пользователя</label>
                </div>

                <div className="form-floating">
                    <input type="email" className="form-control" id="email" name="email"
                           placeholder="Password"/>
                    <label htmlFor="floatingPassword">Введите почту</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="password" name="password"
                           placeholder="Password"/>
                    <label htmlFor="floatingPassword">Введите пароль</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Зарегистрироваться</button>
            </form>
        </>
    );
}