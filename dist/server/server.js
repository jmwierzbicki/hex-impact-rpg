"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const express_1 = tslib_1.__importDefault(require("express"));
const app_1 = require("./app");
// Serve static files...
app_1.app.use(express_1.default.static(__dirname + '/../hex-impact-rpg/browser'));
require("./identity");
// If no URL matches, Send all requests to index.html
app_1.app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname + '/../hex-impact-rpg/browser/index.html'));
});
// default port or localhost
app_1.app.listen(process.env["PORT"] || 5000);
console.log('app listening on ', process.env["PORT"] || 5000);
//# sourceMappingURL=server.js.map