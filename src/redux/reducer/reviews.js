import { normalizedReviews } from '../../fixtures';
import { PUBLISH_REVIEW } from '../constants';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

const reducer = (reviews = defaultReviews, action) => {
  const { type } = action;

  switch (type) {
    case PUBLISH_REVIEW:
      const newReview = {
        id: action.generatedUuidsMap.reviewId,
        userId: action.generatedUuidsMap.userId,
        text: action.payload.reviewInfo.text,
        rating: action.payload.reviewInfo.rate,
      };
      return {
        ...reviews,
        [newReview.id]: newReview,
      };
    default:
      return reviews;
  }
};

export default reducer;
