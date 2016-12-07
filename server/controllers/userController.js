var User = require('../models/userModel.js');

module.exports = {
  addUser: function(userObj) {
    return new Promise(function(resolve, reject) {
      User.register(new User({'username': userObj.username}), userObj.password, function(err, newUser) {
        if(err) {
          reject(err);
        }else {
          resolve(newUser);
        }
      });
    });
  },

  retrieveUser: function(userId) {
    return new Promise(function(resolve, reject) {
      console.log('userid in retrive', userId)
      User.findOne({'_id': userId}, function(err, user) {
        if(err) {
          console.log('err', err)
          reject(err);
        }else {
          console.log('user',user)
          resolve(user);
        }
      });
    });
  }
};
