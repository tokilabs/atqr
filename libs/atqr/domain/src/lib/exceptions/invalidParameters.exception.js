"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.InvalidParametersException = void 0;
var lang_1 = require("@tokilabs/lang");
var InvalidParametersException = /** @class */ (function (_super) {
    __extends(InvalidParametersException, _super);
    function InvalidParametersException(parameters) {
        var _this = _super.call(this, "Invalid parameter values for: ".concat(parameters
            .map(function (p) { return p.name; })
            .join(', '), ".")) || this;
        _this.parameters = parameters;
        return _this;
    }
    return InvalidParametersException;
}(lang_1.Exception));
exports.InvalidParametersException = InvalidParametersException;
