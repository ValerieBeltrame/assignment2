var express = require('express');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var Note = require('./models/Notes');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set
//it up, or 3001
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://testuser:testuser123@ds149040.mlab.com:49040/services');

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now we can set the route path & initialize the API
router.get('/', function (req, res) {
  res.json({ message: 'API Initialized!' });
});


router.route('/notes')
// get all notes from the database
.get((req, res) => {
  Note.find((err, notes) => {
    if (err) {
      res.send(err);
    }

    res.json(notes);
  });
})
// add new note to database
.post((req, res) => {
  const note = new Note();

  // body parser lets us use the req.body
  note.text = req.body.text;

  note.save((err) => {
    if (err) {
      res.send(err);
    }

    res.json('New note was saved!');
  });
})
.put((req, res) => {
  Note.findOneAndUpdate({ "_id": req.body.id }, { "text": req.body.text }, { new: true },  (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  })
});


router.route('/login')
 // validate the google id token
      .post((req, res) => {
        console.log(req.body);
      });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function () {
  console.log(`api running on port ${port}`);
});
