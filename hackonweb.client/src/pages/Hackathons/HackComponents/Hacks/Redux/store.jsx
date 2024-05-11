// store.js

import { createStore } from 'redux';
import hackathonReducer from './reducers';

const store = createStore(hackathonReducer);

export default store;
