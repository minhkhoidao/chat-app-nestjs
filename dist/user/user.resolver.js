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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const user_type_1 = require("./user.type");
const common_1 = require("@nestjs/common");
const graphql_auth_guard_1 = require("../auth/graphql-auth.guard");
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async updateProfile(fullname, file, context) {
        const imageUrl = file ? await this.storeImageAndGetUrl(file) : null;
        const userId = context.req.user.sub;
        return this.userService.updateProfile(userId, fullname, imageUrl);
    }
    async storeImageAndGetUrl(file) {
        const { createReadStream, filename } = await file;
        const uniqueFilename = `${(0, uuid_1.v4)()}_${filename}`;
        const imagePath = (0, path_1.join)(process.cwd(), 'public', 'images', uniqueFilename);
        const imageUrl = `${process.env.APP_URL}/images/${uniqueFilename}`;
        const readStream = createReadStream();
        readStream.pipe((0, fs_1.createWriteStream)(imagePath));
        return imageUrl;
    }
    async searchUsers(fullname, context) {
        return this.userService.searchUsers(fullname, context.req.user.sub);
    }
    getUsersOfChatroom(chatroomId) {
        return this.userService.getUsersOfChatroom(chatroomId);
    }
};
__decorate([
    (0, common_1.UseGuards)(graphql_auth_guard_1.GraphqlAuthGuard),
    (0, graphql_1.Mutation)(() => user_type_1.User),
    __param(0, (0, graphql_1.Args)('fullname')),
    __param(1, (0, graphql_1.Args)('file', { type: () => GraphQLUpload, nullable: true })),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof GraphQLUpload !== "undefined" && GraphQLUpload.FileUpload) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(graphql_auth_guard_1.GraphqlAuthGuard),
    (0, graphql_1.Query)(() => [user_type_1.User]),
    __param(0, (0, graphql_1.Args)('fullname')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "searchUsers", null);
__decorate([
    (0, common_1.UseGuards)(graphql_auth_guard_1.GraphqlAuthGuard),
    (0, graphql_1.Query)(() => [user_type_1.User]),
    __param(0, (0, graphql_1.Args)('chatroomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getUsersOfChatroom", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map