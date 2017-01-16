import * as React from "react";
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import App from "./containers/App";
import { createStore } from "redux";
import reducers from "./reducers";

const store = createStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);

render();

declare const module;

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render()
  });
}

function render() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} key={Math.random()}>
          <Route path="/" component={App}/>
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('mount')
  );
}
