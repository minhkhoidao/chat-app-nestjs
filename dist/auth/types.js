"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = exports.RegisterResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_type_1 = require("../user/user.type");
let RegisterResponse = class RegisterResponse {
};
__decorate([
    (0, graphql_1.Field)(() => user_type_1.User, { nullable: true }),
    __metadata("design:type", user_type_1.User)
], RegisterResponse.prototype, "user", void 0);
RegisterResponse = __decorate([
    (0, graphql_1.ObjectType)()
], RegisterResponse);
exports.RegisterResponse = RegisterResponse;
let LoginResponse = class LoginResponse {
};
__decorate([
    (0, graphql_1.Field)(() => user_type_1.User),
    __metadata("design:type", user_type_1.User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoginResponse);
exports.LoginResponse = LoginResponse;
//# sourceMappingURL=types.js.map