import {render, screen, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../../config";
import store from "../../redux/reducers";
import React from 'react';
import Header from "../../components/Header";

jest.mock("axios");

describe("Header component", () => {
    it("redner ссылки войти и регистрация когда пользователь не аутентифицирован", () => {
        const mockState = {
            user: {
                currentUser: null,
                isAuth: false,
            },
        };

        render(
            <Provider store={{ ...store, getState: () => mockState }}>
                <Router>
                    <Header />
                </Router>
            </Provider>
        );

        expect(screen.getByText("Вход")).toBeInTheDocument();
        expect(screen.getByText("Регистрация")).toBeInTheDocument();
    });

    it("render Главаня и Аккаунт когда пользователь аутентифицирован", () => {
        const mockState = {
            user: {
                currentUser: "testuser",
                isAuth: true,
            },
        };

        render(
            <Provider store={{ ...store, getState: () => mockState }}>
                <Router>
                    <Header />
                </Router>
            </Provider>
        );

        expect(screen.getByText("Главная")).toBeInTheDocument();
        expect(screen.getByText("Аккаунт")).toBeInTheDocument();
    });

    it("вызов handleLogout при нажатии на кнопку выхода из системы", async () => {
        // @ts-expect-error 'type'
        axios.get.mockResolvedValueOnce({
            data: {},
        });

        const mockState = {
            user: {
                currentUser: "testuser",
                isAuth: true,
            },
        };

        render(
            <Provider store={{ ...store, getState: () => mockState }}>
                <Router>
                    <Header />
                </Router>
            </Provider>
        );

        const logoutButton = screen.getByText("Выход");
        fireEvent.click(logoutButton);

        expect(axios.get).toHaveBeenCalledWith(`${API_URL}api/user/logout`, {
            withCredentials: true,
        });
    });
});
