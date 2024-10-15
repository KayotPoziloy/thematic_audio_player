import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUp from '../../../components/auth/SignUp';
import { text } from 'stream/consumers';

describe("/components/auth/SignUp.test.tsx", () => {
  ['Регистрация', 'Введите имя пользователя', 'Введите почту', 'Введите пароль', 'Зарегистрироваться'].forEach(text => {
    test('text "' + text+ '" not found', () => {
      render(<SignUp />);
      const element = screen.getByText(new RegExp(text, 'i'));
      expect(element).toBeInTheDocument();
    });
  });
});