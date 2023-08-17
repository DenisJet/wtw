import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import AddReviewForm from './add-review-form';

const mockStore = configureStore({});
const filmId = 1;

describe(`AddReviewForm test`, () => {
  it(`AddReviewForm render correctly`, () => {
    render(
        <Provider store={mockStore({})}>
          <AddReviewForm filmId={filmId} />
        </Provider>
    );

    expect(screen.getByText(`Post`)).toBeInTheDocument();
  });

  it(`AddReviewForm rating test`, () => {
    render(
        <Provider store={mockStore({})}>
          <AddReviewForm filmId={filmId} />
        </Provider>
    );

    expect(screen.getByTestId(`radio-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`radio-1`)).not.toBeChecked();
    userEvent.click(screen.getByTestId(`radio-1`));
    expect(screen.getByTestId(`radio-1`)).toBeChecked();
  });

  it(`AddReviewForm textarea test`, () => {
    render(
        <Provider store={mockStore({})}>
          <AddReviewForm filmId={filmId} />
        </Provider>
    );

    expect(screen.getByRole(`textbox`)).toBeInTheDocument();
    userEvent.type(screen.getByRole(`textbox`), `best place`);
    expect(screen.getByDisplayValue(/best place/i)).toBeInTheDocument();
  });
});
