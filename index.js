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
            "imageURL": "http://dummyimage.com/199x104.bmp/cc0000/ffffff",
            "imageDescription": "Bristly Hawkbit",
            "name": "Oodoo",
            "sex": "Female",
            "age": "8",
            "breed": "Russian Blue",
            "story": "Grayleaf Willow"
        }, {
            "imageURL": "http://dummyimage.com/169x179.png/dddddd/000000",
            "imageDescription": "Star Coccocarpia Lichen",
            "name": "Tekfly",
            "sex": "Male",
            "age": "6",
            "breed": "Siamese",
            "story": "Pansy Orchid"
        }, {
            "imageURL": "http://dummyimage.com/223x183.png/dddddd/000000",
            "imageDescription": "Desert Penstemon",
            "name": "Tagcat",
            "sex": "Female",
            "age": "0",
            "breed": "Rag Doll",
            "story": "Kihifern"
        }, {
            "imageURL": "http://dummyimage.com/207x199.bmp/ff4444/ffffff",
            "imageDescription": "Necklacepod",
            "name": "Kare",
            "sex": "Female",
            "age": "7",
            "breed": "Sphinx",
            "story": "Bear Valley Milkvetch"
        }, {
            "imageURL": "http://dummyimage.com/101x137.jpg/cc0000/ffffff",
            "imageDescription": "Rio Grande Beeblossom",
            "name": "Skidoo",
            "sex": "Male",
            "age": "7",
            "breed": "Munchkin",
            "story": "Pyrgillus Lichen"
        }];

const dogArray = [
    {
        "imageURL": "http://dummyimage.com/198x140.jpg/5fa2dd/ffffff",
        "imageDescription": "Downy Arrowwood",
        "name": "Miboo",
        "sex": "Female",
        "age": "6",
        "breed": "Affenpinscher",
        "story": "Bristly Dewberry"
    }, {
        "imageURL": "http://dummyimage.com/239x103.png/ff4444/ffffff",
        "imageDescription": "Mexican Skullcap",
        "name": "Meevee",
        "sex": "Male",
        "age": "9",
        "breed": "Bulldog",
        "story": "Prairie Dogshade"
    }, {
        "imageURL": "http://dummyimage.com/249x195.png/5fa2dd/ffffff",
        "imageDescription": "Alyssumleaf Phlox",
        "name": "Wordtune",
        "sex": "Female",
        "age": "3",
        "breed": "Great Dane",
        "story": "Wenatchee Desertparsley"
    }, {
        "imageURL": "http://dummyimage.com/194x170.png/dddddd/000000",
        "imageDescription": "Desert Calico",
        "name": "Skyvu",
        "sex": "Female",
        "age": "4",
        "breed": "Husky",
        "story": "Kansas Peccania Lichen"
    }, {
        "imageURL": "http://dummyimage.com/162x104.jpg/ff4444/ffffff",
        "imageDescription": "Santa Catalina Mountain Phlox",
        "name": "Thoughtworks",
        "sex": "Female",
        "age": "6",
        "breed": "Terrier",
        "story": "Rim Lichen"
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
