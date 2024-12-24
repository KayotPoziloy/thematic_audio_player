import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import SignUp from '../../../components/auth/SignUp';
import { MemoryRouter } from 'react-router-dom';
import userReducer from '../../../reducers/userReducer';
import {configureStore} from "@reduxjs/toolkit";


const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

describe("/components/auth/SignUp.test.tsx", () => {
  ['Регистрация', 'Введите имя пользователя', 'Введите почту', 'Повторите пароль', 'Введите пароль', 'Зарегистрироваться'].forEach(text => {
    test('text "' + text + '" not found', () => {
      render(
          <Provider store={store}>
            <MemoryRouter>
              <SignUp />
            </MemoryRouter>
          </Provider>
      );
      const element = screen.getByText(new RegExp(text, 'i'));
      expect(element).toBeInTheDocument();
    });
  });
});