const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const movies = [
  { _id: 1, movieName: 'titanic', genre: 'romantic' },
  { _id: 2, movieName: 'avengers', genre: 'action' },
  { _id: 3, movieName: 'golmal', genre: 'comedy' },
];

app.get('/', (req, res) => {
  res.send(movies);
});

app.get('/movies/:id', (req, res) => {
  const movie = movies.find((m) => m._id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('<h1>Your request is not available</h1>');
  
  res.send(movie);
});

app.post('/movies', (req, res) => {

  const error = typeValidation(req.body.movieName, req.body.genre)

  if (error) return res.status(400).send(error.details[0].message);

  const movie = {
    id: movies.length + 1,
    movieName: req.body.movieName,
    genre: req.body.genre,
  };
  movies.push(movie);

  res.send(movie);
});

app.put('/movies/:id', (req, res) => {
  const movie = movies.find((m) => m._id === parseInt(req.params.id));
  console.log(movie)
  if (!movie) return res.status(404).send('<h1>Your request is not available</h1>');

  const error = typeValidation(req.body.movieName, req.body.genre)

  if (error) return res.status(400).send(error.details[0].message);

  movie.movieName = req.body.movieName || movies.movieName;
  movie.genre = req.body.genre || movies.regre;
  res.send(movie);
});

app.delete('/movies/:id', (req, res) => {
  const movie = movies.find((m) => m._id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('<h1>Your request is not available</h1>');

  const index = movies.indexOf(movie)
  movies.splice(index, 1)

  res.send(movie)
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function typeValidation(movieName, genre) {
  const schema = Joi.object({
    movieName: Joi.string().required(),
    genre: Joi.string().required(),
  });

  const { error } = schema.validate({
    movieName,
    genre,
  });

  return error
}
