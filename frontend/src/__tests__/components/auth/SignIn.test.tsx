import React from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from '../../../components/auth/SignIn';

describe("/components/auth/SignIn.test.tsx", () => {
  ['Вход', 'Введите имя', 'Введите пароль', 'Войти'].forEach(text => {
    test('text "' + text+ '" not found', () => {
      render(<SignIn />);
      const element = screen.getByText(new RegExp(text, 'i'));
      expect(element).toBeInTheDocument();
    });
  });
});