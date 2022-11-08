"use strict";
exports.__esModule = true;
exports.Email = void 0;
var Email = /** @class */ (function () {
    function Email(to, subject, message) {
        this.to = to;
        this.subject = subject;
        this.message = message;
        this.to = to;
        this.subject = subject;
        this.message = message;
    }
    Object.defineProperty(Email.prototype, "playerEmail", {
        get: function () {
            return this.to.emailAddress.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Email.prototype, "from", {
        get: function () {
            return process.env.FROM_EMAIL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Email.prototype, "Subject", {
        get: function () {
            return this.subject;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Email.prototype, "Message", {
        get: function () {
            return this.message;
        },
        enumerable: false,
        configurable: true
    });
    return Email;
}());
exports.Email = Email;
