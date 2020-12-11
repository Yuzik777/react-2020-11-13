import { combineReducers } from 'redux';
import orderReducer from './order';
import restaurantsReducer from './restaurants';

const reducer = combineReducers({
  restaurants: restaurantsReducer,
  order: orderReducer,
});

export default reducer;
