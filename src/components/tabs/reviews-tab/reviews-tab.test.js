import React from 'react';
import {render, screen} from '@testing-library/react';
import ReviewsTab from './reviews-tab';
import {commentsMocks} from '../../../mocks/comments-mocks';

it(`ReviewsTab should render correctly`, () => {
  render(
      <ReviewsTab comments={commentsMocks} isActive={true} />
  );

  expect(screen.getByText(/Kate Muir/i)).toBeInTheDocument();
  expect(screen.getByText(/Bill Goodykoontz/i)).toBeInTheDocument();
});
