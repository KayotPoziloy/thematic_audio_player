import React from 'react';
import { render, screen} from '@testing-library/react';
import SignIn from '../../../components/auth/SignIn';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import userReducer from '../../../redux/reducers/userReducer';
import { MemoryRouter } from 'react-router-dom';

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
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
  );
};

describe("/components/auth/SignIn.test.tsx", () => {
  test('renders form elements correctly', () => {
    renderWithState(false);  // неавторизовнный пользователь

    ['Вход', 'Введите почту', 'Введите пароль', 'Войти'].forEach(text => {
      const element = screen.getByText(new RegExp(text, 'i'));
      expect(element).toBeInTheDocument();
    });
  });

});
