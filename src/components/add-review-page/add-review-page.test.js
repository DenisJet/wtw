import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import AddReviewPage from './add-review-page';

const mockStore = configureStore({});

it(`AddReviewPage should be render correctly`, () => {
  const store = mockStore({
    DATA: {
      film: {}
    },
    USER: {
      userData: {},
      authorizationStatus: ``
    }
  });

  const history = createMemoryHistory();
  store.dispatch = () => Promise.resolve();

  render(
      <Provider store={store}>
        <Router history={history}>
          <AddReviewPage />
        </Router>
      </Provider>
  );

  expect(screen.getByText(/Add review/i)).toBeInTheDocument();
});
