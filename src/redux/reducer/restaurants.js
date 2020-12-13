import { normalizedRestaurants } from '../../fixtures';
import { PUBLISH_REVIEW } from '../constants';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);

const reducer = (restaurants = defaultRestaurants, action) => {
  const { type } = action;

  switch (type) {
    case PUBLISH_REVIEW:
      const id = action.payload.restaurantId;
      const newReviews = [
        ...restaurants[id].reviews,
        action.generatedUuidsMap.reviewId,
      ];
      return {
        ...restaurants,
        [id]: { ...restaurants[id], reviews: newReviews },
      };
    default:
      return restaurants;
  }
};

export default reducer;
