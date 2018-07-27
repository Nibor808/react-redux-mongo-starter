import thunk from 'redux-thunk';
import reducers from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

const middleWares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log('ENV', process.env.NODE_ENV);
}

if (process.env.NODE_ENV === 'development') {
  const reduxLogger = createLogger({
    collapsed: true,
    diff: true,
    timestamp: false
  });
  middleWares.push(reduxLogger);
}

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  compose(
    applyMiddleware(...middleWares)
  )
);

export default store;
