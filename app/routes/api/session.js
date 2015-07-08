var express = require('express');
var passport = require('passport');
var User = require('../../models/user');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'averagejoesmembers@gmail.com',
    pass: 'mysupersecretpassword'
  }
});

// Try to log in with credentials provided in the request.
// Creates a new session for the user if successful
router.post('/login', passport.authenticate('local'), function(req, res){
  if(req.user.confirmed == "false"){
    var email = req.user.email;
    var rand = req.user.key;
    host=req.get('host');
    link="http://"+req.get('host')+"/verify/"+rand;
    var mailOptions = {
      to : email,
      subject : "Please confirm your Email account",
      html : "Hello "+req.user.firstname+",<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    transporter.sendMail(mailOptions, function(error){
      if(error){
        console.log(error);
      } else{
      }
    });
  	res.status(403).json({currentUser: req.user});
  }
  else {
  	res.json({currentUser: req.user});
  }
});

// Remove the session
router.post('/logout', function(req, res){
  req.logout();
  res.json({});
});

// Return the current user. Returns currentUser as undefined if no current user
router.get("/", function(req, res){
  if(req.user){
    res.status(200).json({currentUser: req.user});
  }
  else{
    res.status(404).json({currentUser: req.user});
  }
});

module.exports = router;
