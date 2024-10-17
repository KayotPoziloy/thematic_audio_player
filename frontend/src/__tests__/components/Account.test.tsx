import React from 'react';
import { render, screen } from '@testing-library/react';
import Account from '../../components/Account';

describe("/components/auth/Account.test.tsx", () => {
  ['Настройки'].forEach(text => {
    test('text "' + text+ '" not found', () => {
      render(<Account />);
      const element = screen.getByText(new RegExp(text, 'i'));
      expect(element).toBeInTheDocument();
    });
  });
});