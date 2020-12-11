import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import styles from './order.module.css';
import MinusIcon from '../product/icons/minus.svg';
import PlusIcon from '../product/icons/plus.svg';
import productStyles from '../product/product.module.css';
import { increment, decrement, reset } from '../../redux/actions';

const Order = ({ items, increment, decrement, reset }) => {
  const totalCost = useMemo(
    () => items.reduce((totalCost, item) => totalCost + item.price, 0),
    [items]
  );
  return (
    <div style={{ width: '100%' }}>
      {items.map((item) => (
        <div className={styles.order}>
          <p>{`${item.name} ${item.price}$ ${item.count} ${
            item.price * item.count
          }$`}</p>
          <div className={productStyles.buttons}>
            <button
              className={productStyles.button}
              onClick={() => decrement(item.id)}
              data-id="product-decrement"
            >
              <img src={MinusIcon} alt="minus" />
            </button>
            <button
              className={productStyles.button}
              onClick={() => increment(item.id)}
              data-id="product-increment"
            >
              <img src={PlusIcon} alt="plus" />
            </button>
            <button
              className={productStyles.button}
              onClick={() => reset(item.id)}
              data-id="product-reset"
            >
              X
            </button>
          </div>
        </div>
      ))}
      <p>{totalCost}</p>
    </div>
  );
};

const getOrderItems = (order, restaurants) => {
  const allProducts = restaurants.reduce(
    (accProducts, restaurant) => accProducts.concat(restaurant.menu),
    []
  );
  return Object.entries(order)
    .map(([id, count]) => {
      const product = allProducts.find((product) => product.id === id);
      return { ...product, count };
    })
    .filter((product) => product.count > 0);
};

const mapStateToProps = (state) => ({
  items: getOrderItems(state.order, state.restaurants),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  increment: (id) => dispatch(increment(id)),
  decrement: (id) => dispatch(decrement(id)),
  reset: (id) => dispatch(reset(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
