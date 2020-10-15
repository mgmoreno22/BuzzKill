module.exports = function(sequelize, DataTypes) {
    const Report = sequelize.define("report", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: 'users',
            // referencesKey: 'id'
            references: {
                model: 'users',
                key: 'id'
            }
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: 'events',
            // referencesKey: 'id'
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
        start_time: DataTypes.DATE,
        notes: DataTypes.TEXT,
        report_timestamp: DataTypes.DATE
    })
    return Report;
}