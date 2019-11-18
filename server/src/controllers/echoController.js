module.exports = (app) => {
  app.get('/echo', (req, res) => {
    res.send(req.query);
  });
};
