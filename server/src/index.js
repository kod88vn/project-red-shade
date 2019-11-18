const express = require('express');
const morgan = require('morgan');
const reload = require('express-reload');
const { spawn } = require('child_process');
const cors = require('cors');
bodyParser = require('body-parser')

const port = 5678;
const path = __dirname + '/routes.js';

const app = express();
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(cors());
app.use(reload(path));
app.use(express.urlencoded());
app.use(express.json());

app.listen(port, () =>
  console.log(`API server running at ${port}.`)
);

if (process.env.CLIENT_ENABLED) {
  const opts = {
    env: process.env,
    cwd: process.cwd(),
    stdio: ['inherit', process.stdout, process.stdout]
  };
  // Run parcel
  spawn('parcel', [ 'watch', process.cwd() + '/client/src/index.html', '--out-dir', process.cwd() +  '/client/build/dist', '--cache-dir', process.cwd() + 'client/build/cache'], opts);
}
