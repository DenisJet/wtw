import React from 'react';
import {render, screen} from '@testing-library/react';
import Tabs from './tabs';
import {filmsMocks} from '../../mocks/films-mocks';
import {commentsMocks} from '../../mocks/comments-mocks';

it(`Tabs should render correctly`, () => {
  render(
      <Tabs film={filmsMocks[0]} comments={commentsMocks} />
  );

  expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  expect(screen.getByText(/Details/i)).toBeInTheDocument();
  expect(screen.getByText(/Director/i)).toBeInTheDocument();
});
