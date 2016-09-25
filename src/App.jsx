var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;

var WeaponList = require('./WeaponList.jsx');

var NoMatch = React.createClass({
  render: function() {
    return <h2>Route does not exist :(</h2>
  }
})

ReactDOM.render(
  (
  <Router>
    <Route path="/weapons" component={WeaponList} />
    <Redirect from="/" to="/weapons" />
    <Route path="*" component={NoMatch} />
  </Router>
), document.getElementById('main'));
