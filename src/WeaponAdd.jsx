var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var WeaponTypeSelect = React.createClass({
  getInitialState: function() {
    return { options: [] };
  },
  componentDidMount: function () {
    console.log('holaaaa');
    $.ajax( '/api/system/WEAPONS_TYPES').done(function (data) {
      var optionsList = [];
      for (var i = 0; i < data.values.length; i++) {
          optionsList.push(
               <option key={i} value={data.values[i]}>{data.values[i]}</option>
           );
       }
       this.setState({ options: optionsList });
    }.bind(this));
  },
  render: function() {
       return <select name="type" placeholder="Type">{this.state.options}</select>
   }
});

var WeaponAdd = React.createClass({
    render: function() {
        return (
            <div className="weaponAdd">
                <form name='weaponForm'>
                  <input type='text' name='name' placeholder="Name" />
                  <WeaponTypeSelect />
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

module.exports = WeaponAdd;
