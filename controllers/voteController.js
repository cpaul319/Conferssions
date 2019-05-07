var Q = require("q");
var db = require("../model.js");

module.exports = {
  truevote: function(req, res, next) {
    updateVoteCount(req, res, 1);
  },
  falsevote: function(req, res, next) {
    updateVoteCount(req, res, -1);
  }
};
  
var updateVoteCount = function(req, res, changeValue) {
var updateVotes = Q.nbind(db.findOneAndUpdate, db);
var query = { title: req.body.title };
    
  updateVotes(query, { $inc: { votes: changeValue } })
    .then(function (idea) {
        res.send(idea);
      })
    .fail(function (err) {
      console.log(err);
      next(err);
    });
};
