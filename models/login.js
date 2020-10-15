module.exports = function(sequelize, DataTypes) {
    const Login = sequelize.define("login", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        login_timestamp: DataTypes.DATE
    })
    return Login;
}