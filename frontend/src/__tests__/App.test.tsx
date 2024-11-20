import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import {combineReducers, createStore} from 'redux';
import userReducer from '../redux/reducers/userReducer';

const renderWithState = (isAuth: boolean) => {
  const initialState = {
    user: {
      isAuth,
      currentUser: isAuth ? { name: 'User' } : null,
    },
  };

  const rootReducer = combineReducers({
    user: userReducer,
  });


  // @ts-expect-error 'type'
  const mockStore = createStore(rootReducer, initialState);

  render(
      <Provider store={mockStore}>
        <App />
      </Provider>
  );
};

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  // @ts-expect-error 'type'
  console.warn.mockRestore();
});

describe("/App.test.tsx", () => {
  test('Тексты для неавторизованного пользователя', () => {
      renderWithState(false);

    expect(screen.getByText(/Вход/i)).toBeInTheDocument();
    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.queryByText(/Аккаунт/i)).not.toBeInTheDocument();
  });

  test('Тексты для авторизованного пользователя', () => {
      renderWithState(true);

    expect(screen.getByText(/Избранное/i)).toBeInTheDocument();
    expect(screen.queryByText(/Вход/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Регистрация/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Аккаунт/i)).toBeInTheDocument();
  });
});
