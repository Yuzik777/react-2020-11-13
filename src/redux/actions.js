import { INCREMENT, DECREMENT, REMOVE, PUBLISH_REVIEW } from './constants';

export const increment = (id) => ({ type: INCREMENT, payload: { id } });
export const decrement = (id) => ({ type: DECREMENT, payload: { id } });
export const remove = (id) => ({ type: REMOVE, payload: { id } });

export const publishReview = (reviewInfo, restaurantId) => ({
  type: PUBLISH_REVIEW,
  payload: { reviewInfo, restaurantId },
  shouldGenerateUuidsForFields: ['reviewId', 'userId'],
});
