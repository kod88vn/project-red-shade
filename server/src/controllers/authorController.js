const path = require('path');
const { authorProcessor } = require(path.resolve('server/src/processors'));
const { commonProcessor } = require(path.resolve('server/src/processors'));

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

module.exports = (app) => {
  app.get('/api/authors', async (req, res) => {
    try {
      const results = await authorProcessor.authorSearch(req.query);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({error});
    }
  });
};

