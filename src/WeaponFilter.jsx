var React = require('react');
var ReactDOM = require('react-dom');

var WeaponFilter = React.createClass({
    getInitialState: function() {
        return {type: ''}
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.weaponsTypes && !this.state.type) {
            this.setState({type: nextProps.weaponsTypes[0].props.value});
        }
    },
    render: function() {
        return (
            <div className="weaponFilter">
                <select name="typeFilter" placeholder="Type" value={this.state.type} onChange={this.onChangeType}>{this.props.weaponsTypes}</select>
                <button onClick={this.submit}>Filter</button>
                <button onClick={this.resetFilter}>Reset</button>

            </div>
        );
    },
    onChangeType: function(e) {
        this.setState({type: e.target.value});
    },
    resetFilter: function(e) {
        this.props.submitHandler({});
    },
    submit: function(e) {
        this.props.submitHandler({type: this.state.type});
    }
});

module.exports = WeaponFilter;
