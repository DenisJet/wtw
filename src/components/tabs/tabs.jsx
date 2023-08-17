import React, {useState} from 'react';

import {FilmTypes} from "../../prop-types/film-types";
import PropTypes from "prop-types";
import {CommentTypes} from "../../prop-types/comment-types";

import OverViewTab from './overview-tab/overview-tab';
import DetailsTab from './details-tab/details-tab';
import ReviewsTab from './reviews-tab/reviews-tab';

const TabsName = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

const Tabs = ({film, comments}) => {
  const [activeTab, setActiveTab] = useState(`Overview`);

  const isActiveClass = (active) => active ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`;
  const className = (tabName) => activeTab === tabName ? isActiveClass(true) : isActiveClass(false);
  const isActiveTab = (tabName) => activeTab === tabName ? true : false;

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className={className(TabsName.OVERVIEW)} onClick={() => setActiveTab(TabsName.OVERVIEW)}>
            <a className="movie-nav__link">{TabsName.OVERVIEW}</a>
          </li>
          <li className={className(TabsName.DETAILS)} onClick={() => setActiveTab(TabsName.DETAILS)}>
            <a className="movie-nav__link">{TabsName.DETAILS}</a>
          </li>
          <li className={className(TabsName.REVIEWS)} onClick={() => setActiveTab(TabsName.REVIEWS)}>
            <a className="movie-nav__link">{TabsName.REVIEWS}</a>
          </li>
        </ul>
      </nav>
      <OverViewTab film={film} isActive={isActiveTab(TabsName.OVERVIEW)} />
      <DetailsTab film={film} isActive={isActiveTab(TabsName.DETAILS)} />
      <ReviewsTab comments={comments} isActive={isActiveTab(TabsName.REVIEWS)} />
    </div>
  );
};

Tabs.propTypes = {
  film: FilmTypes.isRequired,
  comments: PropTypes.arrayOf(CommentTypes),
};

export default Tabs;
