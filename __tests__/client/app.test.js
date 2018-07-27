import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from '../../src/client/components/app.js';
import Header from '../../src/client/components/header';
import Footer from '../../src/client/components/footer';

let wrapped;

beforeEach(() => {
  const mockStore = configureMockStore();
  const store = mockStore({});

  wrapped = shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

describe('Should Render Header And Footer', () => {

  it('renders header', () => {
    expect(wrapped.exists(<Header />)).toBe(true);
  });

  it('renders footer', () => {
    expect(wrapped.exists(<Footer />)).toBe(true);
  });

});