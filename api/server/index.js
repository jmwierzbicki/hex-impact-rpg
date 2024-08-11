"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
exports.default = app_1.app;
require("./identity");
require("./configuration");
// If no URL matches, Send all requests to index.html
// default port or localhost
app_1.app.listen(process.env["PORT"] || 5000);
console.log('app listening on ', process.env["PORT"] || 5000);
//# sourceMappingURL=index.js.map