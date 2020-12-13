import { createSelector } from 'reselect';

const restaurantsSelector = (state) => state.restaurants;
const orderSelector = (state) => state.order;
const productsSelector = (state) => state.products;
const reviewByIdSelector = (state, { id }) => state.reviews[id];
const userByReviewIdSelector = (state, { id }) =>
  state.users[state.reviews[id].userId];

export const fullReviewByIdSelector = createSelector(
  reviewByIdSelector,
  userByReviewIdSelector,
  (review, user) => ({ ...review, user })
);

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  (restaurants) => Object.values(restaurants)
);

const reviewsListOfRestaurantSelector = (state, { id }) =>
  state.restaurants[id].reviews.map((reviewId) => state.reviews[reviewId]);

export const averageRestaurantRateSelector = createSelector(
  reviewsListOfRestaurantSelector,
  (reviews) =>
    Math.round(
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    ) || 0
);

export const productByIdSelector = createSelector(
  productsSelector,
  (state, props) => props.id,
  (products, id) => products[id]
);

export const productAmountByIdSelector = createSelector(
  orderSelector,
  (state, props) => props.id,
  (order, id) => order[id]
);
export const orderProductsSelector = createSelector(
  productsSelector,
  orderSelector,
  (products, order) => {
    return Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
      }));
  }
);

export const totalSelector = createSelector(
  orderProductsSelector,
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);
