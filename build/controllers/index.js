'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _respond = require('./respond');

var _respond2 = _interopRequireDefault(_respond);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = {};

controllers.validate = _validate2.default;
controllers.add = _add2.default;
controllers.respond = _respond2.default;

exports.default = controllers;
//# sourceMappingURL=index.js.map