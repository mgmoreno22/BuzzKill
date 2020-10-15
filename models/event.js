module.exports = function(sequelize, DataTypes) {
    const Event = sequelize.define("event", {
        event_name: {
            type:DataTypes.STRING,
            unique: true
        }
    })
    return Event;
}