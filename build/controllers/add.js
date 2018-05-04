'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _googleSpreadsheet = require('google-spreadsheet');

var _googleSpreadsheet2 = _interopRequireDefault(_googleSpreadsheet);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({ path: 'variables.' + process.env.NODE_ENV + '.env' });

var creds = {
  client_email: process.env.EMAIL,
  private_key: process.env.PKEY
};

var add = {
  row: function row(req, res) {
    if (req.body.spreadsheet) {
      if (!req.body.spreadsheet.id) {
        return new Promise(function (resolve, reject) {
          reject(new Error('No spreadsheetId in spreadsheet object'));
        });
      }
    }

    var spreadsheetId = req.body.spreadsheet ? req.body.spreadsheet.id : process.env.DEFAULTSHEET;
    var doc = new _googleSpreadsheet2.default(spreadsheetId);
    var sheet = void 0;

    return new Promise(function (resolve, reject) {
      _async2.default.series([function setAuth(step) {
        console.log(creds);
        doc.useServiceAccountAuth(creds, step);
      }, function getInfoAndWorksheets(step) {
        doc.getInfo(function (err, info) {
          console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);

          var _info$worksheets = _slicedToArray(info.worksheets, 1);

          sheet = _info$worksheets[0];

          console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);
          step();
        });
      }, function addNewRow(step) {
        doc.addRow(1, {
          errortitle: req.body.title,
          error: req.body.error
        }, function (err, returnedRow) {
          if (err) {
            step(err);
          }
          step(null, returnedRow.id);
        });
      }], function (err, result) {
        if (err) {
          reject(new Error('Sheets Error: ' + err));
        }
        resolve({ message: result.pop() });
      });
    });
  }
};

exports.default = add;
//# sourceMappingURL=add.js.map