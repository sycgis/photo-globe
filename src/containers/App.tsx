import * as React from "react";
import { connect } from 'react-redux';
import Globe from '../components/Globe';
import GlobeActions from "../actions/GlobeActions";

const App = (props) => (
  <div>
    <h1>Hey look! A pretty sphere.</h1>
    {props.children}
    <Globe {...props.globe} setGlobeRotation={props.setGlobeRotation}/>
  </div>
);

const mapStateToProps = (state) => ({
  globe: state.globe,
});

const mapDispatchToProps = (dispatch) => ({
  setGlobeRotation(x, y) {dispatch(GlobeActions.setRotation(x, y))},
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
