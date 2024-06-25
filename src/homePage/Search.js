import { useRef } from 'react';
import search from './svg icons/search.svg';

function Search({ doSearch }) {
    // useRef to access the search input element

    const searchBox = useRef(null);

    // Function to call the doSearch prop with the current value of the search input
    const searchfunc = function () {
        doSearch(searchBox.current.value);
    }

    return (
        <div className="search">
            <img className="ms-2" id="logo" src={search} alt="search" />
            <input ref={searchBox} onChange={searchfunc} onKeyUp={searchfunc} className="searchinput" type="search" placeholder="Search" />
        </div>
    );

}

export default Search;