var userController = require('./controllers/userController.js');
var jobsController = require('./controllers/jobsController.js');


module.exports = {

getUser: function(req, res) {
  var userId = req.user._id;
  console.log('user id in get user' , userId);
  userController.retrieveUser(userId)
  .then(function(user) {
    if(user === null) {
      res.sendStatus(204);
    } else {
      res.status(200).json(user);
    }
  }).catch(function(err) {
    console.error(err);
    res.status(500).json(err);
  });
  },

  postUser: function(req, res) {
    userController.addUser(req.body)
    .then(function(user) {
      res.status(201).json(user);
    }).catch(function(err) {
      console.error(err);
      res.status(400).json(err);
    });
  },

  logout: function(req, res) {
    req.session.destroy();
    res.send();
  }, //all of the docs say that this is not async....

  auth: function(req, res) {
    if(req.user) {
      res.send(true);
    } else {
      res.send(false);
    }
  },

  getJobs: function(req, res) {
    var userId = req.user._id;

    jobsController.getJobsFromDb(userId)
    .then(function(jobs) {
      res.send(jobs);
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    });
  },

  createJob: function(req, res) {
    //need to get rid of this once we are actually authenitcating
    if(!req.user) {
      var username = 'Nick';
    } else {
      //this will be what we want to keep
      username = req.user.username;
    }


    var job = req.body;
    jobsController.addJobToDb(job, username)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    });
  },

  deleteJob: function(req, res) {
    //need to get rid of this once we are actually authenitcating
    if(!req.user) {
      var username = 'Nick';
    } else {
      //this will be what we want to keep
      username = req.user.username;
    }

    var job = req.body;
    jobsController.removeJobFromDb(job, username)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(204);
    });
  },

  updateJob: function(req, res) {
    //need to get rid of this once we are actually authenitcating
    if(!req.user) {
      var username = 'Nick';
    } else {
      //this will be what we want to keep
      username = req.user.username;
    }

    var job = req.body;
    jobsController.updateJobInDb(job, username)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(204);
    });
  }
};
