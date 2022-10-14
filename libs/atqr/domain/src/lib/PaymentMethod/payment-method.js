"use strict";
exports.__esModule = true;
exports.PaymentMethodEntity = exports.PaymentMethodEnum = void 0;
var lang_1 = require("@tokilabs/lang");
var PaymentMethodEnum;
(function (PaymentMethodEnum) {
    PaymentMethodEnum["creditCard"] = "creditCard";
    PaymentMethodEnum["debitCard"] = "debitCard";
})(PaymentMethodEnum = exports.PaymentMethodEnum || (exports.PaymentMethodEnum = {}));
var PaymentMethodEntity = /** @class */ (function () {
    function PaymentMethodEntity(method, paymentService, token) {
        this.id = new lang_1.Guid();
        this.method = method;
        this.paymentService = paymentService;
        this.token = token;
    }
    PaymentMethodEntity.prototype.getToken = function () {
        return this.token;
    };
    return PaymentMethodEntity;
}());
exports.PaymentMethodEntity = PaymentMethodEntity;
