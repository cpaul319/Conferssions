var bcrypt = require("bcrypt-nodejs");

// creates the user table
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Associating User with multiple Confessions
  // When User is deleted, deleted any associated confessions
  User.associate = function(models) {
    User.hasMany(models.Confession, {
      onDelete: "cascade"
    });
  };

  // Associating User with multiple Votes
  // When User is deleted, deleted any associated votes
  User.associate = function(models) {
    User.hasMany(models.Vote, {
      onDelete: "cascade"
    });
  };

// Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
// Hooks are automatic methods that run during various phases of the User Model lifecycle
// In this case, before a User is created, we will automatically hash their password
User.hook("beforeCreate", function(user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});


  return User;
};
