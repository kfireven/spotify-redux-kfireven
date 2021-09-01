import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history';

import { search } from '../components/Search/searchReducers';

export const history = createBrowserHistory();

const reducers = combineReducers({
    search,
    router: connectRouter(history)
});

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, routerMiddleware(history))
);

export default store;