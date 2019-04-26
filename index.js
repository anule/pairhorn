/* *********************************************
 * Pairhorn: A Slack bot that generates pairs
 *
 * Author: Anule Ndukwu (@awnoodles)
 * Contributor(s): Ben Sheldon (
 * *********************************************/

'use strict';

const http = require('http');
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const { pairs } = require('./pairs');
const message = require('./message');
const keepalive = require('./keepalive');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// keeps the app active
keepalive()

// Internal integration only (No OAuth)
const oauthToken = process.env.SLACK_AUTH_TOKEN;

const storage = require('node-persist');
storage.initSync();

let apiUrl = 'https://slack.com/api';


/* *******************************
/* Slash Command
/* ***************************** */

app.post('/pairhorn', (req, res) => {
  if(req.body.token !== process.env.SLACK_VERIFICATION_TOKEN) {
    // the request is NOT coming from Slack!
    res.sendStatus(401);
    return;
  } else {
    getReply(req.body)
      .then((result) => {
        res.json(result);
    });
  }
});

// Reply in JSON
const getReply = (body) => new Promise((resolve, reject) => {
  let data = {};
  if(body.text) {
    let pairNames = pairs(body.text);
    let response = message(pairNames);
    data = {
     response_type: 'in_channel',
      text: '📣 Pairs 📣',
      attachments:[{
        text: response
      }]
    };
    return resolve(data); 
  } else { // no query entered
    data = {
      response_type: 'ephemeral', // private message
      text: 'How to use /pairhorn command:',
      attachments:[
      {
        text: 'Type the names of people who want to pair, e.g. `/pairhorn @anule`',
      }
    ]};
    return resolve(data);
  }
});


/* *******************************
/* OAuth
/* implement when distributing the bot
/* ***************************** */

app.get('/auth', function(req, res){
  if (!req.query.code) { // access denied
    console.log('Access denied');
    return;
  }
  var data = {form: {
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    code: req.query.code
  }};
  request.post(apiUrl + '/oauth.access', data, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      
      // Get an auth token (and store the team_id / token)    
      storage.setItemSync(JSON.parse(body).team_id, JSON.parse(body).access_token);
      
      res.sendStatus(200);
      
      // Show a nicer web page or redirect to Slack, instead of just giving 200 in reality!
      //res.redirect(__dirname + "/public/success.html");
    }
  })
});

/* Extra */
module.exports = app;
module.exports.stop = function() {
  server.close();
}
