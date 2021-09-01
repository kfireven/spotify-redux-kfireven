import { searchByNameAPI } from '../../app/apis';

export const search = (name, resultsOffset) =>
    (dispatch) => {
        searchByNameAPI(name, resultsOffset).then(res => {
        dispatch(updateSearchList(res));
    });
};

export const updateSearchList = res => {
    return {
        type: 'UPDATE_SEARCH_LIST',
        searchResults: res
    };
};