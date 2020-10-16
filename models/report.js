module.exports = function(sequelize, DataTypes) {
    const Report = sequelize.define("report", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'events',
                key: 'id'
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_id: DataTypes.INTEGER,
        start_time: DataTypes.STRING,
        notes: DataTypes.TEXT
    })
    return Report;
}