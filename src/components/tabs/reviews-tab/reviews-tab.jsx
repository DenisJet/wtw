import React from "react";

import PropTypes from "prop-types";
import {CommentTypes} from "../../../prop-types/comment-types";

const ReviewsTab = ({comments, isActive}) => {
  return (
    isActive && (
      <div className="movie-card__reviews movie-card__row">
        <div className="movie-card__reviews-col">
          {comments.slice(0, Math.ceil(comments.length / 2)).map((comment) => {
            return (
              <div className="review" key={comment.id}>
                <blockquote className="review__quote">
                  <p className="review__text">{comment.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{comment.user.name}</cite>
                    <time
                      className="review__date"
                      dateTime={new Date(comments[0].date).toLocaleDateString(
                          `en-EN`,
                          {year: `numeric`, month: `numeric`, day: `numeric`}
                      )}
                    >
                      {new Date(comment.date).toLocaleDateString(`en-EN`, {
                        month: `long`,
                        day: `numeric`,
                        year: `numeric`,
                      })}
                    </time>
                  </footer>
                </blockquote>

                <div className="review__rating">{comment.rating}</div>
              </div>
            );
          })}
        </div>
        <div className="movie-card__reviews-col">
          {comments
            .slice(Math.ceil(comments.length / 2), comments.length)
            .map((comment) => {
              return (
                <div className="review" key={comment.id}>
                  <blockquote className="review__quote">
                    <p className="review__text">{comment.comment}</p>

                    <footer className="review__details">
                      <cite className="review__author">
                        {comment.user.name}
                      </cite>
                      <time
                        className="review__date"
                        dateTime={new Date(comments[0].date).toLocaleDateString(
                            `en-EN`,
                            {year: `numeric`, month: `numeric`, day: `numeric`}
                        )}
                      >
                        {new Date(comment.date).toLocaleDateString(`en-EN`, {
                          month: `long`,
                          day: `numeric`,
                          year: `numeric`,
                        })}
                      </time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">{comment.rating}</div>
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

ReviewsTab.propTypes = {
  comments: PropTypes.arrayOf(CommentTypes),
  isActive: PropTypes.bool,
};

export default ReviewsTab;
