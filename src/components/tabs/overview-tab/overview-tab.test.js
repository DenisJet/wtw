import React from 'react';
import {render, screen} from '@testing-library/react';
import OverViewTab from './overview-tab';
import {filmsMocks} from '../../../mocks/films-mocks';

it(`OverViewTab should render correctly`, () => {
  render(
      <OverViewTab film={filmsMocks[0]} isActive={true} />
  );

  expect(screen.getByText(/Director/i)).toBeInTheDocument();
  expect(screen.getByText(/Starring/i)).toBeInTheDocument();
});
