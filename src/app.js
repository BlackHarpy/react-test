var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var WeaponsFilter = React.createClass({
    render: function() {
        return (
            <div className="weaponFilter">
                Weapons filtering
            </div>
        );
    }
});

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

var WeaponAdd = React.createClass({
    render: function() {
        return (
            <div className="weaponAdd">
                <form name='weaponForm'>
                  <input type='text' name='name' placeholder="Name" />
                  <input type='text' name='type' placeholder="Type" />
                  <input type='text' name='damage' placeholder="Damage" />
                  <input type='number' name='speed' placeholder="Speed" />
                  <input type='number' name='weight' placeholder="Weght" />
                  <input type='number' name='thaco' placeholder="THACO Modifier" />
                  <input type='text' name='special' placeholder="Special" />
                  <button onClick={this.handleSummit}>Add Weapon</button>
                </form>
            </div>
        );
    },
    handleSummit: function(e) {
      e.preventDefault();
      var form = document.forms.weaponForm;
      this.props.addWeapon({
        name: form.name.value,
        type: form.type.value,
        damage: form.damage.value,
        speed: form.speed.value,
        weight: form.weight.value,
        thaco: form.thaco.value,
        special: form.special.value
      })
    }
})

var WeaponsList = React.createClass({
    getInitialState: function() {
        return {weapons: []};
    },
    componentDidMount: function() {
      $.ajax('/api/weapons').done(function(data) {
        this.setState({weapons: data});
      }.bind(this));
    },
    render: function() {
        return (
            <div className="weaponList">
                <WeaponsFilter/>
                <WeaponTable weapons={this.state.weapons}/>
                <hr/>
                <WeaponAdd addWeapon={this.addWeapon}/>
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

ReactDOM.render(
    <WeaponsList/>, document.getElementById('main'));
