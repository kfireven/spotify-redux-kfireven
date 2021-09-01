import { searchByNameAPI } from '../../app/apis';

export const search = (name, type) =>
    (dispatch) => {
        searchByNameAPI(name, type).then(res => {
        dispatch(updateSearchList(res));
    });
};

export const updateSearchList = res => {
    return {
        type: 'UPDATE_SEARCH_LIST',
        searchResults: res
    };
};