const Token = require('./token.model');
const User = require('./user.model');
const Event = require('./event.model');


// Association with User
Event.belongsTo(User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'user'
});

Event.hasMany(User, {
    as: 'participants'
});

User.hasMany(Event, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'userId',
    as: 'events'
});

module.exports = { Token, User, Event }