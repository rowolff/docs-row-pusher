'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// use the correct variables depending on the node evnviroment
// NODE_ENV is set in package.json scripts
require('dotenv').config({ path: 'variables.' + process.env.NODE_ENV + '.env' });

// import the routes


var app = (0, _express2.default)();

// only show logs during development
if (process.env.NODE_ENV === 'development') {
  app.use((0, _morgan2.default)('dev'));
}

// add the body parser to Express middleware
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// allow CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:' + process.env.PORT);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// setup routes, see each file inside the ./routes
// directory for more information
app.use('/api/add', _index2.default.add);

app.get('*', function (req, res) {
  return res.send('Nothing here, API is at: \n 👉 /api/add');
});

// Only listen for connections when the server is
// called directly from node. This avoids listening
// for connections when running tests.
if (require.main === module) {
  app.listen(process.env.PORT, function () {
    // eslint-disable-next-line no-console
    console.log('Server on http://localhost:' + process.env.PORT);
  });
}

exports.default = app;
//# sourceMappingURL=app.js.map