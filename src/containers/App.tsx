import * as React from "react";
import {connect} from 'react-redux';
import Globe from '../components/Globe';

const App = (props) => (
  <div>
    <h1>Hey look! A pretty sphere.</h1>
    {props.children}
    <Globe {...props.globe}/>
  </div>
);

const mapStateToProps = (state) => ({
  globe: state.globe,
});

export default connect(mapStateToProps)(App);
