const path = require('path');
const { bookProcessor } = require(path.resolve('server/src/processors'));
const { commonProcessor } = require(path.resolve('server/src/processors'));

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

module.exports = (app) => {
  app.get('/api/books', async (req, res) => {
    try {
      const results = await bookProcessor.getAll(req.query);
      const total = await commonProcessor.getTotal('books');
      results.total= total;
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({error});
    }
  });

  app.post('/api/books', async (req, res) => {
    try {
      const book = await bookProcessor.insert(req.body);
      await bookProcessor.verifySync(book.id);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({error});
    }
  });

  app.put('/api/books', async (req, res) => {
    try {
      const book = await bookProcessor.update(req.body);
      // sleep to wait for sync to finish
      await sleep(1000);
      res.status(202).json(book);
    } catch (error) {
      res.status(500).json(error)
    }
  });

  app.delete('/api/books', async (req, res) => {
    try {
      await bookProcessor.remove(req.body.id);
      await bookProcessor.verifySync(req.body.id, false);
      res.status(202).json();
    } catch (err) {
      res.status(500).json(err)
    }
  });
};

