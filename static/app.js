var WeaponsFilter = React.createClass({
  displayName: 'WeaponsFilter',

  render: function () {
    return React.createElement(
      'div',
      { className: 'weaponFilter' },
      ' Weapons filtering '
    );
  }
});

var weaponAttributes = ['id', 'name', 'type', 'damage', 'speed', 'weight', 'thacoMod', 'special'];

var weaponsData = [{
  id: 1,
  name: 'Battle Axe +1',
  type: 'Axe',
  damage: '2-9',
  speed: 6,
  weight: 7,
  thacoMod: 1,
  special: ""
}, {
  id: 2,
  name: 'Dragon Slayer',
  type: 'Long Sword',
  damage: '3-10',
  speed: 3,
  weight: 3,
  thacoMod: 2,
  special: "Double damage vs dragons, immune to fear, +1 HP every 10 rounds, Detect Invisibility once per day"
}];

var WeaponRow = React.createClass({
  displayName: 'WeaponRow',

  generateRowData: function () {
    var weapon = this.props.weapon;
    var keys = this.props.weaponsAttributes;
    var i = 0;

    return keys.map(function (key) {
      i++;
      return React.createElement(
        'td',
        { key: i },
        weapon[key]
      );
    });
  },
  render: function () {
    var row = this.generateRowData();
    return React.createElement(
      'tr',
      null,
      row
    );
  }
});

var WeaponTable = React.createClass({
  displayName: 'WeaponTable',

  render: function () {
    var weaponsRows = this.props.weapons.map(function (weapon) {
      return React.createElement(WeaponRow, { key: weapon.id, weapon: weapon, weaponsAttributes: weaponAttributes });
    });
    return React.createElement(
      'div',
      { className: 'WeaponTable' },
      React.createElement(
        'table',
        null,
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              'Id'
            ),
            React.createElement(
              'th',
              null,
              'Name'
            ),
            React.createElement(
              'th',
              null,
              'Type'
            ),
            React.createElement(
              'th',
              null,
              'Damage'
            ),
            React.createElement(
              'th',
              null,
              'Speed'
            ),
            React.createElement(
              'th',
              null,
              'Weight'
            ),
            React.createElement(
              'th',
              null,
              'THACO Mod'
            ),
            React.createElement(
              'th',
              null,
              'Special'
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          weaponsRows
        )
      )
    );
  }
});

var WeaponAdd = React.createClass({
  displayName: 'WeaponAdd',

  render: function () {
    return React.createElement(
      'div',
      { className: 'weaponAdd' },
      ' Add Weapon '
    );
  }
});

var WeaponsList = React.createClass({
  displayName: 'WeaponsList',

  render: function () {
    return React.createElement(
      'div',
      { className: 'weaponList' },
      React.createElement(WeaponsFilter, null),
      React.createElement(WeaponTable, { weapons: weaponsData }),
      React.createElement(WeaponAdd, null)
    );
  }
});

ReactDOM.render(React.createElement(WeaponsList, null), document.getElementById('main'));