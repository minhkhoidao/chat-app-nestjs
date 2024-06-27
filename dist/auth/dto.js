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
exports.LoginDto = exports.RegisterDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let RegisterDto = class RegisterDto {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Fullname is required.' }),
    (0, class_validator_1.IsString)({ message: 'Fullname must be a string.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "fullname", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required.' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Confirm Password is required.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email must be valid.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
RegisterDto = __decorate([
    (0, graphql_1.InputType)()
], RegisterDto);
exports.RegisterDto = RegisterDto;
let LoginDto = class LoginDto {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email must be valid.' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required.' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
LoginDto = __decorate([
    (0, graphql_1.InputType)()
], LoginDto);
exports.LoginDto = LoginDto;
//# sourceMappingURL=dto.js.map