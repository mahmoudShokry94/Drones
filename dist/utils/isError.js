"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isError = (error) => {
    return error.status && error.message;
};
exports.default = isError;
//# sourceMappingURL=isError.js.map