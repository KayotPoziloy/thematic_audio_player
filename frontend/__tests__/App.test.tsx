import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { text } from 'stream/consumers';

describe("/App.test.tsx", () => {
  ['Избранное', 'Главная', 'Вход', 'Регистрация', 'Аккаунт', 'footer'].forEach(text => {
    test('text "' + text+ '" not found', () => {
      render(<App />);
      const element = screen.getByText(new RegExp(text, 'i'));
      expect(element).toBeInTheDocument();
    });
  });
});