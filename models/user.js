// PROJECT NOTE: THIS PROCESS SHOULD BE REPLACED WITH md5 PACKAGE

// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// const md5 = require("md5");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10)
    );
  });
  return User;
  // User.addHook("beforeCreate", (user) => {
  //   var salt = "MyWiErDSa|tValuEEE";
  //   user.password = md5(passwword + salt);
  // });
  // return User;
};
