import React, {useState} from "react";
import {useDispatch} from 'react-redux';

import {postComment} from "../../store/api-action";

import PropTypes from 'prop-types';
import {toast} from 'react-toastify';

const AddReviewForm = ({filmId}) => {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState(``);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleRatingChange = (evt) => {
    setRating(evt.target.value);
  };

  const handleReviewChange = (evt) => {
    setReview(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSubmitting(true);

    dispatch(postComment(filmId, review, rating))
    .then(() => {
      setRating(null);
      setReview(``);
      setSubmitting(false);
    })
    .catch(() => {
      setSubmitting(false);
      toast(`Loading error`);
    });
  };

  const isDisabled = ((review.length < 50) || (review.length > 400)) ||
  (rating === null);

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          <input
            className="rating__input"
            id="star-1"
            type="radio"
            name="rating"
            value="1"
            checked={rating === `1`}
            onChange={handleRatingChange}
            disabled={submitting}
            data-testid="radio-1"
          />
          <label className="rating__label" htmlFor="star-1">
            Rating 1
          </label>

          <input
            className="rating__input"
            id="star-2"
            type="radio"
            name="rating"
            value="2"
            checked={rating === `2`}
            onChange={handleRatingChange}
            disabled={submitting}
          />
          <label className="rating__label" htmlFor="star-2">
            Rating 2
          </label>

          <input
            className="rating__input"
            id="star-3"
            type="radio"
            name="rating"
            value="3"
            checked={rating === `3`}
            onChange={handleRatingChange}
            disabled={submitting}
          />
          <label className="rating__label" htmlFor="star-3">
            Rating 3
          </label>

          <input
            className="rating__input"
            id="star-4"
            type="radio"
            name="rating"
            value="4"
            checked={rating === `4`}
            onChange={handleRatingChange}
            disabled={submitting}
          />
          <label className="rating__label" htmlFor="star-4">
            Rating 4
          </label>

          <input
            className="rating__input"
            id="star-5"
            type="radio"
            name="rating"
            value="5"
            checked={rating === `5`}
            onChange={handleRatingChange}
            disabled={submitting}
          />
          <label className="rating__label" htmlFor="star-5">
            Rating 5
          </label>

          <input
            className="rating__input"
            id="star-6"
            type="radio"
            name="rating"
            value="6"
            checked={rating === `6`}
            onChange={handleRatingChange}
            disabled={submitting}
          />
          <label className="rating__label" htmlFor="star-6">
            Rating 6
          </label>

          <input
            className="rating__input"
            id="star-7"
            type="radio"
            name="rating"
            value="7"
            checked={rating === `7`}
            onChange={handleRatingChange}
            disabled={submitting}
          />
          <label className="rating__label" htmlFor="star-7">
            Rating 7
          </label>

          <input
            className="rating__input"
            id="star-8"
            type="radio"
            name="rating"
            value="8"
            checked={rating === `8`}
            onChange={handleRatingChange}
            disabled={submitting}
          />
          <label className="rating__label" htmlFor="star-8">
            Rating 8
          </label>

          <input
            className="rating__input"
            id="star-9"
            type="radio"
            name="rating"
            value="9"
            checked={rating === `9`}
            onChange={handleRatingChange}
            disabled={submitting}
          />
          <label className="rating__label" htmlFor="star-9">
            Rating 9
          </label>

          <input
            className="rating__input"
            id="star-10"
            type="radio"
            name="rating"
            value="10"
            checked={rating === `10`}
            onChange={handleRatingChange}
            disabled={submitting}
          />
          <label className="rating__label" htmlFor="star-10">
            Rating 10
          </label>
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={review}
          onChange={handleReviewChange}
          disabled={submitting}
          required
        ></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={isDisabled || submitting}>
            Post
          </button>
        </div>
      </div>
      <p className="review__text">
          To post review please make sure to set rating and describe your stay with at least 50 characters.
      </p>
    </form>
  );
};

AddReviewForm.propTypes = {
  filmId: PropTypes.number.isRequired,
};

export default AddReviewForm;
