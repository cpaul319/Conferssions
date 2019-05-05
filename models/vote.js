// // creates the Voting table
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define("Vote", {
    // Giving the Author model a name of type STRING
    trueConfession: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    Comment: {
      type: DataTypes.STRING
    }
  });

  // Associating a Vote to a User
  // Does not have to vote
  Vote.associate = function(models) {
    Vote.belongsTo(models.User, {
      allowNull: true
    });
  };

  //   // Associating Votes with with a confessions
  //   // Does not have to a confessions
  Vote.associate = function(models) {
    Vote.belongsTo(models.Confession, {
      allowNull: false
    });
  };
  return Vote;
};
