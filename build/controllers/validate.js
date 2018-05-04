'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validate = {
  request: function request(req, res) {
    return new Promise(function (resolve, reject) {
      if (req.body.title && req.body.error) {
        resolve({ message: 'No validation errors' });
      } else {
        reject(new Error('validation error'));
      }
    });
  }
};

exports.default = validate;
//# sourceMappingURL=validate.js.map