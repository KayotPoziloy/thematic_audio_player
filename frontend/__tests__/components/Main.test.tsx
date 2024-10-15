import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from '../../components/Main';
import { text } from 'stream/consumers';
import userEvent from '@testing-library/user-event'

describe("/components/Main.test.tsx", () => {
  ['Start', 'Stop'].forEach(text => {
    test('text "' + text+ '" not found', () => {
      render(<Main />);
      const element = screen.getByText(new RegExp(text, 'i'));
      expect(element).toBeInTheDocument();
    });
  });

  test('Stop', () => {
    const mockPause = jest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {});
    render(<Main />);
    userEvent.click(screen.getByText('Stop'));
    expect(mockPause).toHaveBeenCalled();
  });

  test('Start', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(''),
      })
    ) as jest.Mock;
    render(<Main />);
    userEvent.click(screen.getByText('Start'));
    expect(global.fetch).toHaveBeenCalled();
  });
});
