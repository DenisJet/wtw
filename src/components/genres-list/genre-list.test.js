import React from 'react';
import {render} from '@testing-library/react';
import GenresList from './genres-list';

it(`GenresList should render correctly`, () => {
  const genresList = [`All genres`];
  const activeGenre = `All genres`;
  const onClick = () => {};

  const {getByText} = render(
      <GenresList genresList={genresList} activeGenre={activeGenre} onClick={onClick} />
  );

  expect(getByText(`All genres`)).toBeInTheDocument();
});
