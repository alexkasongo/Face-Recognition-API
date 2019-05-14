const Clarifai = require('clarifai');

// Clarifai API configuration
const app = new Clarifai.App({apiKey: '1234c58db7604228b70e9f995f79cdf1'});

const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.json('Unable to get entries'));
}

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall
}
