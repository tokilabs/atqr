"use strict";
exports.__esModule = true;
exports.EmailAddress = void 0;
var EmailValidator = require("email-validator");
var EmailAddress = /** @class */ (function () {
    function EmailAddress(email) {
        var isValidEmail = EmailValidator.validate(email);
        if (isValidEmail) {
            this.value = email;
        }
        else {
            throw new Error('Invalid Email');
        }
    }
    return EmailAddress;
}());
exports.EmailAddress = EmailAddress;
