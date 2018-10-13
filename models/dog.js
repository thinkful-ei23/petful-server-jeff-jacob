const Queue = require('./../queue');
const seedDogs = require('./../db/seed/dogs')

const dogQueue = new Queue();

seedDogs.forEach(dog => dogQueue.enqueue(dog));


module.exports = dogQueue;
