"use strict";
exports.__esModule = true;
exports.Player = void 0;
var lang_1 = require("@tokilabs/lang");
var EmailService_1 = require("../EmailService");
var invalidParameters_exception_1 = require("../exceptions/invalidParameters.exception");
var Player = /** @class */ (function () {
    function Player(_name, _email, _challenges) {
        if (_challenges === void 0) { _challenges = []; }
        this._name = _name;
        this._email = _email;
        this._challenges = _challenges;
        this._id = new lang_1.Guid();
        var errors = [];
        if (typeof _name !== 'string' || (0, lang_1.isEmpty)(_name.trim())) {
            errors.push({ name: '_name', error: 'Player requires a name' });
        }
        if (!(_email instanceof EmailService_1.EmailAddress)) {
            errors.push({ name: '_email', error: 'Player requires an email' });
        }
        if (errors.length > 0) {
            throw new invalidParameters_exception_1.InvalidParametersException(errors);
        }
    }
    Object.defineProperty(Player.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "emailAddress", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "challenges", {
        get: function () {
            return this._challenges;
        },
        enumerable: false,
        configurable: true
    });
    return Player;
}());
exports.Player = Player;
