module.exports = function(sequelize, DataTypes) {
    const Location = sequelize.define("location", {
        location_type: {
            type: DataTypes.STRING,
            unique: true
        }
    })
    return Location;
}