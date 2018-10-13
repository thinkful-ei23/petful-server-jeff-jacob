const Queue = require('./../queue');
const seedCats = require('./../db/seed/cats')

const catQueue = new Queue();

seedCats.forEach(cat => catQueue.enqueue(cat));


module.exports = catQueue;





