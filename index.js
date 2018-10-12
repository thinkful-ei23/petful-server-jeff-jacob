'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

const catArray = [
        {
            "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Cat_Janna.jpg/330px-Cat_Janna.jpg",
            "imageDescription": "russian blue cat with green eyes",
            "name": "Oodoo",
            "sex": "Female",
            "age": "8",
            "breed": "Russian Blue",
            "story": "looking to own a human"
        }, {
            "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Modern_Seal_Point_Female.jpg/255px-Modern_Seal_Point_Female.jpg",
            "imageDescription": "profile siamese cat",
            "name": "Tekfly",
            "sex": "Male",
            "age": "6",
            "breed": "Siamese",
            "story": "ready to settle down with a family"
        }, {
            "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNglsVukj4KrJrvwwI6_HbRzt9-89DS6na5uZHizjWcVuuHlP-HA",
            "imageDescription": "Ragdoll cat showing its feet",
            "name": "Tagcat",
            "sex": "Female",
            "age": "0",
            "breed": "Rag Doll",
            "story": "looking for a new hairdresser"
        }, {
            "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Sphinx2_July_2006.jpg/330px-Sphinx2_July_2006.jpg",
            "imageDescription": "Sphynx cat with black and pink skin",
            "name": "Kare",
            "sex": "Female",
            "age": "7",
            "breed": "Sphinx",
            "story": "It feels like it is getting cold and I need a warm place to stay for winter"
        }, {
            "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ_C2NfdUttZ5PzRHT0DqCVAPRrtNYe67wJrUULVO2SN1iG6jT",
            "imageDescription": "Munchkin cat on counter side profile",
            "name": "Skidoo",
            "sex": "Male",
            "age": "7",
            "breed": "Munchkin",
            "story": "looking for a high energy family that takes long walks"
        }];

const dogArray = [
    {
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Borismindre.jpg/255px-Borismindre.jpg",
        "imageDescription": "Affenpinscher bearded face",
        "name": "Miboo",
        "sex": "Female",
        "age": "6",
        "breed": "Affenpinscher",
        "story": "I've seen much of the world and I'm ready to take some naps"
    }, {
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/CH_Buck_and_Sons_Evita_Peron.jpg/330px-CH_Buck_and_Sons_Evita_Peron.jpg",
        "imageDescription": "English Bulldog",
        "name": "Mexican Skullcap",
        "sex": "Male",
        "age": "9",
        "breed": "English Bulldog",
        "story": "just retired from MMA"
    }, {
        "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREyZY6LzHqhfGWM70ELR3Hd7fM1L42iRDwisUhFGmPKsbzfSlH",
        "imageDescription": "white with speckled black great dane",
        "name": "Wordtune",
        "sex": "Female",
        "age": "3",
        "breed": "Great Dane",
        "story": "will work for bed"
    }, {
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Woody_Puppy.jpg/330px-Woody_Puppy.jpg",
        "imageDescription": "Husky Puppy",
        "name": "Skyvu",
        "sex": "Female",
        "age": "4",
        "breed": "Husky",
        "story": "looking for a northern home, I get hot easily"
    }, {
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Softcoated_Wheaten_Terrier_Clio.JPG/220px-Softcoated_Wheaten_Terrier_Clio.JPG",
        "imageDescription": "Soft Coated Wheaten Terrier",
        "name": "Thoughtworks",
        "sex": "Female",
        "age": "6",
        "breed": "Wheaten Terrier",
        "story": "buyer beware I do not intend to take walks"
    }];

app.get('/api/cat', (req, res) => {
    res.send(catArray[0]);
});

app.get('/api/dog', (req, res) => {
    res.send(dogArray[0]);
});

app.delete('/api/cat', (req, res) => {
    catArray.shift();
    res.status(204)
        .end();
})

app.delete('/api/dog', (req, res) => {
    dogArray.shift();
    res.status(204)
        .end();
})


// Custom 404 Not Found route handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Custom Error Handler
app.use((err, req, res, next) => {
    if (err.status) {
        const errBody = Object.assign({}, err, { message: err.message });
        res.status(err.status).json(errBody);
    } else {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
