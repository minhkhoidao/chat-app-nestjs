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
exports.UserStoppedTyping = exports.UserTyping = exports.Message = exports.Chatroom = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_type_1 = require("../user/user.type");
let Chatroom = class Chatroom {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], Chatroom.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Chatroom.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Chatroom.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Chatroom.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [user_type_1.User], { nullable: true }),
    __metadata("design:type", Array)
], Chatroom.prototype, "users", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Message], { nullable: true }),
    __metadata("design:type", Array)
], Chatroom.prototype, "messages", void 0);
Chatroom = __decorate([
    (0, graphql_1.ObjectType)()
], Chatroom);
exports.Chatroom = Chatroom;
let Message = class Message {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Chatroom, { nullable: true }),
    __metadata("design:type", Chatroom)
], Message.prototype, "chatroom", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_type_1.User, { nullable: true }),
    __metadata("design:type", user_type_1.User)
], Message.prototype, "user", void 0);
Message = __decorate([
    (0, graphql_1.ObjectType)()
], Message);
exports.Message = Message;
let UserTyping = class UserTyping {
};
__decorate([
    (0, graphql_1.Field)(() => user_type_1.User, { nullable: true }),
    __metadata("design:type", user_type_1.User)
], UserTyping.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], UserTyping.prototype, "chatroomId", void 0);
UserTyping = __decorate([
    (0, graphql_1.ObjectType)()
], UserTyping);
exports.UserTyping = UserTyping;
let UserStoppedTyping = class UserStoppedTyping extends UserTyping {
};
UserStoppedTyping = __decorate([
    (0, graphql_1.ObjectType)()
], UserStoppedTyping);
exports.UserStoppedTyping = UserStoppedTyping;
//# sourceMappingURL=chatroom.types.js.map