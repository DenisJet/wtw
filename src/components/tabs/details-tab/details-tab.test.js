import React from 'react';
import {render, screen} from '@testing-library/react';
import DetailsTab from './details-tab';
import {filmsMocks} from '../../../mocks/films-mocks';

it(`DetailsTab should render correctly`, () => {
  render(
      <DetailsTab film={filmsMocks[0]} isActive={true} />
  );

  expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
  expect(screen.getByText(/Genre/i)).toBeInTheDocument();
});
