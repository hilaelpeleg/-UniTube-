import { useRef } from 'react';
import search from './svg icons/search.svg';

function Search(doSearch) {

    const searchBox = useRef(null);

    const searchfunc = function () {
        doSearch(searchBox.current.value);
    }

    return (
        <div className="search">
            <img className="ms-2" id="logo" src={search} alt="search" />
            <input ref={searchBox} onKeyUp={searchfunc} className="searchinput" type="search" placeholder="Search" />
        </div>
    );

}

export default Search;