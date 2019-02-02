var express = require("express");
var app = express();

var server = app.listen(8080, function () {
    console.log("Listening on port %s...", server.address().port);
});