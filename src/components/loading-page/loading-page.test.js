import React from 'react';
import {render} from '@testing-library/react';
import LoadingPage from './loading-page';

it(`LoadingPage should render correctly`, () => {
  const {getByText} = render(
      <LoadingPage />
  );

  expect(getByText(`Loading ...`)).toBeInTheDocument();
});
