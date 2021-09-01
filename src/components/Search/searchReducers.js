const initialState = {
    searchResults: []
}

export const search = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SEARCH_LIST':
            return Object.assign({}, state, { searchResults: action.searchResults });
        default:
            return state;
    }
};