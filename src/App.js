import React from 'react';
import { Provider } from 'mobx-react';
import Router from './Router';
import stores from './stores';

const App = () => (
  <Provider BuildingStore={stores.BuildingStore}>
    <Router />
  </Provider>
);

export default App;
