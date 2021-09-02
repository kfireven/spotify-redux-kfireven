import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Form, Table, FormControl, Dropdown, DropdownButton } from "react-bootstrap";
import { search, updateSearchList } from './searchActions';
import ReactPlayer from 'react-player';
import './searchStyles.scss';

function Search() {
    
    const [searchValue, setSearchValue] = useState('');
    const [filterValue, setFilterValue] = useState('none');
    const [preFilterSearchResults, setPreFilterSearchResults] = useState({});
    const [sortValue, setSortValue] = useState('');
    const [resultsOffset, setResultsOffset] = useState(0);

    const searchResults = useSelector(state => state.search.searchResults);
    const dispatch = useDispatch();

    useEffect(() => {
        if(filterValue == 'none')
            setPreFilterSearchResults(searchResults);
    }, [searchResults]);

    useEffect(() => {
        if(searchValue)
            perfomSearch();
    }, [resultsOffset]);
    
    const fillTable = (track, index) => {
        return (
            <tr key={index}>
                <td ><img src={track.album.images[2].url}/></td>
                <td >{track.name}</td>
                <td >{track.artists[0].name}</td>
                <td >{track.album.name}</td>
                <td >{new Date(track.album.release_date).getFullYear()}</td>
                <td ><ReactPlayer controls="true" height="25px" width="80px" url={track.preview_url}/></td>
           </tr>
        )
    }

    const perfomSearch = (event) => {
        event.preventDefault();
        dispatch(search(searchValue, resultsOffset));
    }

    const searchFilterChanged = (value) => {
        setFilterValue(value);
        var arr = preFilterSearchResults;

        if (value == 'track') {
            arr = arr.filter( result => {
                return result.name.toLowerCase().includes(searchValue.toLowerCase());
            });
        } else if (value == 'artist'){
            arr = arr.filter( result => {
                return result.artists[0].name.toLowerCase().includes(searchValue.toLowerCase());
            });
        }

        dispatch(updateSearchList(arr));
    }

    const searchSortChanged = (value) => {
        setSortValue(value);

        searchResults.sort(function(a, b) {
            var nameA;
            var nameB;

            if (value == 'track') {
                nameA = a.name.toUpperCase();
                nameB = b.name.toUpperCase();
            }   else {
                nameA = a.artists[0].name.toUpperCase();
                nameB = b.artists[0].name.toUpperCase();
            }

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });

          dispatch(updateSearchList(searchResults));
    }

    return (
        <div className="search">
            <Form className="search-bar" onSubmit={perfomSearch}>
                <FormControl className="search-input" type="text" placeholder="Search" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                
                <DropdownButton id="bootsrtap-buttons" size={window.screen.width >= 800 ? null : 'sm'} onSelect={ value => searchFilterChanged(value) } title="Filter">
                    <Dropdown.Item className={filterValue == 'none' ? 'dropdown-selected' : 'dropdown-notselected'} eventKey="none">None</Dropdown.Item>
                    <Dropdown.Item className={filterValue == 'track' ? 'dropdown-selected' : 'dropdown-notselected'} eventKey="track">Song</Dropdown.Item>
                    <Dropdown.Item className={filterValue == 'artist' ? 'dropdown-selected' : 'dropdown-notselected'} eventKey="artist">Artist</Dropdown.Item>
                </DropdownButton>
               
                <DropdownButton id="bootsrtap-buttons" size={window.screen.width >= 800 ? null : 'sm'} onSelect={ value => searchSortChanged(value) } title="Sort by">
                    <Dropdown.Item className={sortValue == 'track' ? 'dropdown-selected' : 'dropdown-notselected'} eventKey="track">Song name</Dropdown.Item>
                    <Dropdown.Item className={sortValue == 'artist' ? 'dropdown-selected' : 'dropdown-notselected'} eventKey="artist">Artist name</Dropdown.Item>
                </DropdownButton>
                
                <Button id="bootsrtap-buttons" size={window.screen.width >= 800 ? null : 'sm'} disabled={searchValue.length < 2} type="submit">Search</Button>
            </Form>
            
            <div className="search-table">
            <Table>
                <thead>
                    <tr>
                    <th></th>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Year</th>
                    <th>Preview</th> 
                    </tr>
                </thead>
                <tbody>
                    {searchResults ? searchResults.map(fillTable) : <b>Can't fetch data. Spotify's frontend token might have expired. Please refresh the token by refreshing the page (F5).</b>}
                </tbody>
            </Table>
            </div>
           
            <div className="buttom-buttons">
                <Button id="bootsrtap-buttons" size={window.screen.width >= 800 ? null : 'sm'} disabled={resultsOffset <= 0} style={{float: 'left'}} onClick={ _ => setResultsOffset(resultsOffset - 15)}>Previous 15</Button>
                <Button id="bootsrtap-buttons" size={window.screen.width >= 800 ? null : 'sm'} style={{float: 'right'}} onClick={ _ => setResultsOffset(resultsOffset + 15)}>Next 15</Button>
            </div>
        </div>
    )
}

export default Search;