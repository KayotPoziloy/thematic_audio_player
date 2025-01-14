import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserState } from '../../../reducers/userReducer';
import SignIn from "../../../components/auth/SignIn";
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const createMockStore = (preloadedState: { user: UserState }) => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
  });
};

describe('SignIn Component', () => {
  test('render формы входа с вводом имени пользователя и пароля', () => {
    render(
        <Provider store={createMockStore({ user: { currentUser: null, isAuth: false } })}>
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </Provider>
    );

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /войти/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

});
