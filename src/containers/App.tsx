import * as React from "react";
import { connect } from 'react-redux';
import Globe from '../components/Globe';
import GlobeActions from "../actions/GlobeActions";

import "../stylesheets/main.scss";

const App = (props) => (
  <div className="app">
    <header>Header</header>
    <section className="main row">
      <section className="content col-xs-12 col-sm-8">
        {props.children}
      </section>
      <section className="globe col-xs-12 col-sm-4">
        <Globe {...props.globe} setLocation={props.setLocation}/>
      </section>
    </section>
    <footer>Footer</footer>
  </div>
);

const mapStateToProps = (state) => ({
  globe: state.globe,
});

const mapDispatchToProps = (dispatch) => ({
  setLocation(x, y) {dispatch(GlobeActions.setLocation(x, y))},
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
