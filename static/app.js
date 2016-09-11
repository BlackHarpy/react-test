var WeaponsFilter = React.createClass({
    displayName: 'WeaponsFilter',

    render: function () {
        return React.createElement(
            'div',
            { className: 'weaponFilter' },
            'Weapons filtering'
        );
    }
});

var weaponAttributes = ['_id', 'name', 'type', 'damage', 'speed', 'weight', 'thacoMod', 'special'];

var WeaponRow = React.createClass({
    displayName: 'WeaponRow',

    generateRowData: function () {
        var weapon = this.props.weapon;
        var keys = this.props.weaponsAttributes;

        return keys.map(function (key, i) {
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
            return React.createElement(WeaponRow, { key: weapon._id, weapon: weapon, weaponsAttributes: weaponAttributes });
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
            React.createElement(
                'form',
                { name: 'weaponForm' },
                React.createElement('input', { type: 'text', name: 'name', placeholder: 'Name' }),
                React.createElement('input', { type: 'text', name: 'type', placeholder: 'Type' }),
                React.createElement('input', { type: 'text', name: 'damage', placeholder: 'Damage' }),
                React.createElement('input', { type: 'number', name: 'speed', placeholder: 'Speed' }),
                React.createElement('input', { type: 'number', name: 'weight', placeholder: 'Weght' }),
                React.createElement('input', { type: 'number', name: 'thaco', placeholder: 'THACO Modifier' }),
                React.createElement('input', { type: 'text', name: 'special', placeholder: 'Special' }),
                React.createElement(
                    'button',
                    { onClick: this.handleSummit },
                    'Add Weapon'
                )
            )
        );
    },
    handleSummit: function (e) {
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
        });
    }
});

var WeaponsList = React.createClass({
    displayName: 'WeaponsList',

    getInitialState: function () {
        return { weapons: [] };
    },
    componentDidMount: function () {
        $.ajax('/api/weapons').done(function (data) {
            this.setState({ weapons: data });
        }.bind(this));
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'weaponList' },
            React.createElement(WeaponsFilter, null),
            React.createElement(WeaponTable, { weapons: this.state.weapons }),
            React.createElement('hr', null),
            React.createElement(WeaponAdd, { addWeapon: this.addWeapon })
        );
    },
    addWeapon: function (weapon) {
        $.ajax({
            type: 'POST',
            url: '/api/weapons',
            contentType: 'application/json',
            data: JSON.stringify(weapon),
            success: function (data) {
                var weapon = data;
                var updatedWeapons = this.state.weapons.concat(weapon);
                this.setState({ weapons: updatedWeapons });
            }.bind(this),
            error: function (xhr, status, err) {
                console.log('Error adding weapon:', err);
            }
        });
    }
});

ReactDOM.render(React.createElement(WeaponsList, null), document.getElementById('main'));