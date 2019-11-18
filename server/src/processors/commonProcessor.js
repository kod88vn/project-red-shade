const request = require('request');

const getTotal = index => {
  return new Promise((resolve, reject) => {
    request(`http://localhost:9200/${index}/_count`, { json: true }, (err, res, body) => {
      if (err) {
        reject(error);
      }
      resolve(body.count);
    });
  })

};

module.exports = { getTotal };
