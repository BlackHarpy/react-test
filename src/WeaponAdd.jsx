var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var WeaponTypeSelect = React.createClass({
  getInitialState: function() {
    return { options: [] };
  },
  render: function() {
       return <select name="type" placeholder="Type">{this.props.options}</select>
   }
});

var WeaponAdd = React.createClass({
    render: function() {
        return (
            <div className="weaponAdd">
                <form name='weaponForm'>
                  <input type="text" name='name' placeholder="Name" />
                  <WeaponTypeSelect options={this.props.weaponsTypes}/>
                  <input type="text" name="damage" placeholder="Damage" />
                  <input type="number" name="speed" placeholder="Speed" />
                  <input type="number" name="weight" placeholder="Weght" />
                  <input type="number" name="thaco" placeholder="THACO Modifier" />
                  <input type="text" name="special" placeholder="Special" />
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
