import React from 'react';
import Searchicon from '../homePage/svg icons/searchSub.svg';

const UserPageMenu = () => {
  return (
    <div className="user-page-menu-container">
      <div className="cardUserA align-right">
        <div className="card-body">
          <div className="row-buttons-container marginupSUb">
            <div className="btn-group-container-row">
              <button type="button" className="btn btn-light margin">Home</button>
              <button type="button" className="btn btn-light margin">Videos</button>
              <button type="button" className="btn btn-light margin">Releases</button>
              <button type="button" className="btn btn-light margin">Playlists</button>
              <button type="button" className="btn btn-light margin">
                <img className="marginbutton" src={Searchicon} alt="Searchicon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageMenu;
