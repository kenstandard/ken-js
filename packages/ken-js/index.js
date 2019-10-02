const crypto = require('crypto');

global.crypto = {
  getRandomValues: function(buffer) {
    crypto.randomFill(buffer, function(err, buf){
      if (err) throw err;
    });
  }
};

setInterval(() => {
  const ken = require('./dist/index.js');
  const data = require('./data');
  const db = ken.main(data);

  console.log('DB things length is', db.things().length);
  console.log('DB directories length is', db.directories().length);
  console.log('DB rootDirectories length is', db.rootDirectories().length);
  console.log('DB facts length', db.json().facts.length);
  console.log('DB things length', db.json().things.length);
}, 1000);


