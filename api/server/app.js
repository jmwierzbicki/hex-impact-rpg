"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
//pgsql
//# sourceMappingURL=app.js.map