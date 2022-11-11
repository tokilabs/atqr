"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Challenge = exports.ChallengeStatus = exports.SupervisorEnum = void 0;
var lang_1 = require("@tokilabs/lang/");
var class_transformer_1 = require("class-transformer");
var date_difference_1 = require("../../utils/date-difference");
var SupervisorEnum;
(function (SupervisorEnum) {
    SupervisorEnum[SupervisorEnum["notInvited"] = 0] = "notInvited";
    SupervisorEnum[SupervisorEnum["invited"] = 1] = "invited";
    SupervisorEnum[SupervisorEnum["accepted"] = 2] = "accepted";
    SupervisorEnum[SupervisorEnum["askedIfTheGoalIsAccomplished"] = 3] = "askedIfTheGoalIsAccomplished";
    SupervisorEnum[SupervisorEnum["repliedIfTheGoalWasAccomplished"] = 4] = "repliedIfTheGoalWasAccomplished";
})(SupervisorEnum = exports.SupervisorEnum || (exports.SupervisorEnum = {}));
var ChallengeStatus;
(function (ChallengeStatus) {
    ChallengeStatus["Ongoing"] = "Ongoing";
    ChallengeStatus["Completed"] = "Completed";
    ChallengeStatus["Failed"] = "Failed";
    ChallengeStatus["Overdue"] = "Overdue";
})(ChallengeStatus = exports.ChallengeStatus || (exports.ChallengeStatus = {}));
var Challenge = /** @class */ (function () {
    function Challenge(_goal, _supervisorName, _supervisorEmail, _player, price, deadline, _paymentMethod, _status, _supervisorStatus) {
        if (_status === void 0) { _status = ChallengeStatus.Ongoing; }
        if (_supervisorStatus === void 0) { _supervisorStatus = SupervisorEnum.notInvited; }
        this._goal = _goal;
        this._supervisorName = _supervisorName;
        this._supervisorEmail = _supervisorEmail;
        this._player = _player;
        this._paymentMethod = _paymentMethod;
        this._supervisorStatus = _supervisorStatus;
        this._id = new lang_1.Guid();
        if (price >= 25) {
            this._price = price;
        }
        else {
            throw new Error('Selecione um valor acima de 25 reais');
        }
        var today = new Date();
        if ((0, date_difference_1.dateDiff)(today, deadline) > 1) {
            this._deadline = deadline;
        }
        else {
            throw Error('Selecione uma data futura');
        }
        this._status = _status;
    }
    Object.defineProperty(Challenge.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Challenge.prototype, "goal", {
        get: function () {
            return this._goal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Challenge.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Challenge.prototype, "deadline", {
        get: function () {
            return this._deadline;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Challenge.prototype, "price", {
        get: function () {
            return this._price;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Challenge.prototype, "supervisorStatus", {
        get: function () {
            return this._supervisorStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Challenge.prototype, "supervisorName", {
        get: function () {
            return this._supervisorName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Challenge.prototype, "supervisorEmail", {
        get: function () {
            return this._supervisorEmail;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Challenge.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Challenge.prototype, "paymentMethod", {
        get: function () {
            return this._paymentMethod;
        },
        enumerable: false,
        configurable: true
    });
    Challenge.prototype.changeSupervisor = function (newSupervisorName, newSupervisorEmail) {
        this._supervisorName = newSupervisorName;
        this._supervisorEmail = newSupervisorEmail;
    };
    Challenge.prototype.changePaymentMethod = function (paymentMethod) {
        this._paymentMethod = paymentMethod;
    };
    /**
     * Checks if the challenge became overdue and returns true if the status changes
     */
    Challenge.prototype.updateOverdueStatus = function () {
        if (this.deadline < new Date()) {
            this._status = ChallengeStatus.Overdue;
            return true;
        }
        else {
            return false;
        }
    };
    Challenge.prototype.updateStatus = function (status) {
        this._status = status;
    };
    __decorate([
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return ChallengeStatus[value];
        })
    ], Challenge.prototype, "_status");
    return Challenge;
}());
exports.Challenge = Challenge;
