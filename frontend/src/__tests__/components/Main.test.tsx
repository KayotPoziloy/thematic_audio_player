import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Main from '../../components/Main';
import userEvent from '@testing-library/user-event';
import {API_URL} from "../../config";

describe("/components/Main.test.tsx", () => {

  ['Start', 'Stop'].forEach((text) => {
    test(`text "${text}" is not found`, () => {
      render(<Main />);
      const element = screen.getByText(new RegExp(text, 'i'));
      expect(element).toBeInTheDocument();
    });
  });

  test('нажатие стоп для паузы', async () => {
    const mockPause = jest
        .spyOn(window.HTMLMediaElement.prototype, 'pause')
        .mockImplementation(() => { });

    render(<Main />);
    userEvent.click(screen.getByText('Stop'));

    await waitFor(() => expect(mockPause).toHaveBeenCalled());
  });

  test('нажатие на старт для вызова ошибки', async () => {
    // @ts-expect-error 'type'
    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
        })
    );

    render(<Main />);
    userEvent.click(screen.getByText('Start'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  test('кнопка старт для запуска видео', async () => {
    const mockAudioBlob = new Blob(['audio data'], { type: 'audio/mpeg' });

    // @ts-expect-error 'type'
    global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          blob: jest.fn().mockResolvedValueOnce(mockAudioBlob),
        })
    );
    global.URL.createObjectURL = jest.fn().mockReturnValue('mocked-audio-url');

    render(<Main />);

    userEvent.click(screen.getByText('Start'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(API_URL + "/api/music/m/audio.mp3"));
  });

});
