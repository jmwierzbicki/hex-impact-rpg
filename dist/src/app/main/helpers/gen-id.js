"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genID = void 0;
const tslib_1 = require("tslib");
const slugify_1 = tslib_1.__importDefault(require("slugify"));
function genID(name) {
    return (0, slugify_1.default)(name, {
        remove: undefined,
        lower: true,
        strict: true,
        trim: true
    });
}
exports.genID = genID;
//# sourceMappingURL=gen-id.js.map