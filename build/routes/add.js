'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../controllers/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res, next) {
  _index2.default.validate.request(req, res).then(function () {
    return next();
  }).catch(function (error) {
    return res.json(error);
  });
}, function (req, res, next) {
  _index2.default.add.row(req, res).then(function (response) {
    res.addedAt = response.message;
    next();
  }).catch(function (error) {
    return res.json(error);
  });
}, function (req, res) {
  _index2.default.respond.message(req, res).then(function (message) {
    return res.end(JSON.stringify(message, null, 2));
  });
});

module.exports = router;
//# sourceMappingURL=add.js.map