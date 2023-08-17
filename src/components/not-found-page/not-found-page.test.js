import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundPage from './not-found-page';

it(`NotFoundPage should render correctly`, () => {
  const history = createMemoryHistory();
  history.push(`/non-existent-route`);

  const {getByText} = render(
      <Router history={history}>
        <NotFoundPage />
      </Router>
  );

  expect(getByText(`404. Page not found`)).toBeInTheDocument();
  expect(getByText(`Вернуться на главную`)).toBeInTheDocument();
});
