var WeaponsFilter = React.createClass({
  render: function () {
    return (
      <div className="weaponFilter"> Weapons filtering </div>
    );
  }
})

var weaponAttributes = ['id', 'name', 'type', 'damage','speed', 'weight', 'thacoMod','special'];

var weaponsData = [{
  id: 1,
  name: 'Battle Axe +1',
  type: 'Axe',
  damage: '2-9',
  speed: 6,
  weight: 7,
  thacoMod: 1,
  special: ""
},{
  id: 2,
  name: 'Dragon Slayer',
  type: 'Long Sword',
  damage: '3-10',
  speed: 3,
  weight: 3,
  thacoMod: 2,
  special: "Double damage vs dragons, immune to fear, +1 HP every 10 rounds, Detect Invisibility once per day"
}]

var WeaponRow = React.createClass({
  generateRowData: function () {
    var weapon = this.props.weapon;
    var keys = this.props.weaponsAttributes;
    var i = 0;

    return keys.map(function(key) {
      i++;
      return <td key={i}>{weapon[key]}</td>;
    })

  },
  render: function () {
    var row = this.generateRowData();
    return (
      <tr>
      {row}
      </tr>
    )
  }
})

var WeaponTable = React.createClass({
  render: function () {
    var weaponsRows = this.props.weapons.map(function(weapon) {
      return <WeaponRow key={weapon.id} weapon={weapon}  weaponsAttributes={weaponAttributes} />
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
  render: function () {
    return (
      <div className="weaponAdd"> Add Weapon </div>
    );
  }
})

var WeaponsList = React.createClass({
  render: function () {
    return (
      <div className="weaponList">
        <WeaponsFilter/>
        <WeaponTable weapons={weaponsData}/>
        <WeaponAdd/>
      </div>
    );
  }
})

ReactDOM.render(
  <WeaponsList />,
  document.getElementById('main')
);
