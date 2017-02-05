import * as React from "react";
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import App from "./containers/App";
import Post from "./containers/Post";

declare const window;
declare const module;

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const history = syncHistoryWithStore(browserHistory, store);

render();


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
          <Route path="/" component={App}>
            <Route path="post" component={Post}/>
          </Route>
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('mount')
  );
}
