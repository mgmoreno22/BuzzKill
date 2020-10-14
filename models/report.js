module.exports = function(sequelize, DataTypes) {
    const Reports = sequelize.define("reports", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 'users',
            referencesKey: 'user_id'
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 'event_types',
            referencesKey: 'event_id'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_id: DataTypes.INTEGER,
        start_time: DataTypes.DATETIME,
        notes: DataTypes.TEXT,
        report_timestamp: DataTypes.TIMESTAMP
    })
}