"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var jsonParser = _bodyParser2.default.json();

app.post("/add", jsonParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log(JSON.stringify(req.body, null, 2));
    res.send(req.body);
});

app.get("/", function (req, res) {
    res.send("POST /add using 'title' and 'error'");
});

app.listen(3003);