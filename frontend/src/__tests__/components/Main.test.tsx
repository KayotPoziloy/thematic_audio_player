import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from '../../components/Main';
import userEvent from '@testing-library/user-event'


describe("/components/Main.test.tsx", () => {
  

  ['Start', 'Stop'].forEach(text => {
    test('text "' + text + '" not found', () => {
      render(<Main />);
      const element = screen.getByText(new RegExp(text, 'i'));
      expect(element).toBeInTheDocument();
    });
  });

  
  test('Stop', () => {
    const mockPause = jest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => { });
    
    render(<Main />);

    userEvent.click(screen.getByText('Stop')); 
    expect(mockPause).toHaveBeenCalled();
    
    
  });
  
  test('Start catch', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    render(<Main />);
    userEvent.click(screen.getByText('Start'));
    expect(global.fetch).toHaveBeenCalled();
  });

  test('Start try',  () => {
    const mockAudioBlob = new Blob(['audio data'], { type: 'audio/mpeg' });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        blob: jest.fn().mockResolvedValueOnce(mockAudioBlob),
      })
    );
    global.URL.createObjectURL = jest.fn().mockReturnValue('mocked-audio-url');

    render(<Main />); 
    userEvent.click(screen.getByText('Start'));
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:5000/audio");
  }); 

});
