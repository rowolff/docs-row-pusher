"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var respond = {
  message: function message(req, res) {
    return new Promise(function (resolve) {
      var returnMessage = {
        status: res.statusCode,
        message: res.statusMessage,
        addedAt: res.addedAt,
        data: req.body
      };
      resolve(returnMessage);
    });
  }
};

exports.default = respond;
//# sourceMappingURL=respond.js.map