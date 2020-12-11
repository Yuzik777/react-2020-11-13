import { DECREMENT, INCREMENT, RESET } from '../constants';

// { [productId]: amount }
const reducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [payload.id]: (state[payload.id] || 0) + 1 };
    case DECREMENT:
      return state[payload.id] > 0
        ? { ...state, [payload.id]: (state[payload.id] || 0) - 1 }
        : state;
    case RESET:
      const newState = { ...state };
      delete newState[payload.id];
      return newState;
    default:
      return state;
  }
};

export default reducer;
