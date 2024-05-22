const Token = require('./token.model');
const User = require('./user.model');
const Event = require('./event.model');
const Participant = require('./participants.model');


// Association with User
Event.belongsTo(User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'user'
});

User.hasMany(Participant)

Event.hasMany(Participant)
Participant.belongsTo(Event)
Participant.belongsTo(User)

module.exports = { Token, User, Event }