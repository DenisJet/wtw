import React from 'react';
import {render} from '@testing-library/react';
import VideoPlayer from './video-player';

it(`VideoPlayer should be render correctly`, () => {
  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};

  const mockPath = `mock-path`;
  const {container} = render(
      <VideoPlayer
        src={mockPath}
        isControls={true}
      />
  );

  expect(container.querySelector(`video`)).toBeInTheDocument();
});
