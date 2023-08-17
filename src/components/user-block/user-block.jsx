import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/api-action';

const UserBlock = ({authorizationStatus, userData}) => {
  const dispatch = useDispatch();

  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
    return (
      <div className="user-block">
        <Link to={AppRoute.SINGIN} className="user-block__link">Sign in</Link>
      </div>);
  } else {
    return (
      <>
        <div className="user-block">
          <Link to={AppRoute.MYLIST}>
            <div className="user-block__avatar">
              <img src={userData.avatarUrl} alt="User avatar" width="63" height="63" />
            </div>
          </Link>
        </div>
        <button type="button"
          style={{
            background: `none`,
            border: `none`,
            cursor: `pointer`,
            color: `white`
          }}
          onClick={() => dispatch(logout())}>
        LogOut
        </button>
      </>
    );
  }
};

export default UserBlock;
