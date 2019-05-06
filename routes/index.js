const path = require('path');
const router = require('express').Router();
const apiConfessionRoute = require('./confession-api-routes');
const apiUserRoute = require('./user-api-routes');

const htmlRoutes = require('./html-routes');

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // cms route loads cms.html
  router.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  router.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // users route loads user-manager.html
  router.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user-manager.html"));
  });

router.use('/api', apiUserRoute);
router.use('/api', apiConfessionRoute);
//router.use('*', htmlRoutes);


module.exports = router;