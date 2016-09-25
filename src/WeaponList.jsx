var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var WeaponFilter = require('./WeaponFilter.jsx');
var WeaponAdd = require('./WeaponAdd.jsx');

var weaponAttributes = [
    '_id',
    'name',
    'type',
    'damage',
    'speed',
    'weight',
    'thacoMod',
    'special'
];

var WeaponList = React.createClass({
    getInitialState: function() {
        return {weapons: []};
    },
    componentDidMount: function() {
      this.loadData({})

      $.ajax( '/api/system/WEAPONS_TYPES').done(function (data) {
        var optionsList = [];
        for (var i = 0; i < data.values.length; i++) {
            optionsList.push(
                 <option key={i} value={data.values[i]}>{data.values[i]}</option>
             );
         }
         this.setState({ weaponsTypes: optionsList });
      }.bind(this));
    },
    loadData: function(filter) {
      $.ajax('/api/weapons',{data: filter}).done(function(data) {
        this.setState({weapons: data});
      }.bind(this));
    },
    render: function() {
        return (
            <div className="weaponList">
                <WeaponFilter weaponsTypes={this.state.weaponsTypes} submitHandler={this.loadData}/>
                <WeaponTable weapons={this.state.weapons}/>
                <hr/>
                <WeaponAdd addWeapon={this.addWeapon} weaponsTypes={this.state.weaponsTypes}/>
            </div>
        );
    },
    addWeapon: function(weapon) {
      $.ajax({
        type: 'POST',
        url: '/api/weapons',
        contentType: 'application/json',
        data: JSON.stringify(weapon),
        success: function (data) {
          var weapon = data;
          var updatedWeapons = this.state.weapons.concat(weapon);
          this.setState({weapons: updatedWeapons});
        }.bind(this),
        error: function (xhr, status, err) {
          console.log('Error adding weapon:', err);
        }
      })
    }
});

var WeaponRow = React.createClass({
    generateRowData: function() {
        var weapon = this.props.weapon;
        var keys = this.props.weaponsAttributes;

        return keys.map(function(key,i) {
            return <td key={i}>{weapon[key]}</td>;
        })

    },
    render: function() {
        var row = this.generateRowData();
        return (
            <tr>
                {row}
            </tr>
        )
    }
})

var WeaponTable = React.createClass({
    render: function() {
        var weaponsRows = this.props.weapons.map(function(weapon) {
            return <WeaponRow key={weapon._id} weapon={weapon} weaponsAttributes={weaponAttributes}/>
        });
        return (
            <div className="WeaponTable">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Damage</th>
                            <th>Speed</th>
                            <th>Weight</th>
                            <th>THACO Mod</th>
                            <th>Special</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weaponsRows}
                    </tbody>
                </table>
            </div>
        );
    }
})

module.exports = WeaponList;
