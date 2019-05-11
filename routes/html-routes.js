// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
// For checking if a user is logged in


module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("../views/index");
    return;
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  //need route to collect login
  //var loginData; var registerData;
  //call back name or id from db
  //gotta define ajax routes to public js folder into New Js file for ajax

};