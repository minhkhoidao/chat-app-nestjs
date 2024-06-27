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
exports.ChatroomResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const chatroom_service_1 = require("./chatroom.service");
const user_service_1 = require("../user/user.service");
const custom_exception_filter_1 = require("../filters/custom-exception.filter");
const common_1 = require("@nestjs/common");
const graphql_auth_guard_1 = require("../auth/graphql-auth.guard");
const chatroom_types_1 = require("./chatroom.types");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const user_type_1 = require("../user/user.type");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
let ChatroomResolver = class ChatroomResolver {
    constructor(chatroomService, userService) {
        this.chatroomService = chatroomService;
        this.userService = userService;
        this.pubSub = new graphql_subscriptions_1.PubSub();
    }
    newMessage(chatroomId) {
        return this.pubSub.asyncIterator(`newMessage.${chatroomId}`);
    }
    userStartedTyping(chatroomId, userId) {
        return this.pubSub.asyncIterator(`userStartedTyping.${chatroomId}`);
    }
    userStoppedTyping(chatroomId, userId) {
        return this.pubSub.asyncIterator(`userStoppedTyping.${chatroomId}`);
    }
    async userStartedTypingMutation(chatroomId, context) {
        const user = await this.userService.getUser(context.req.user.sub);
        await this.pubSub.publish(`userStartedTyping.${chatroomId}`, {
            user,
            typingUserId: user.id,
        });
        return user;
    }
    async userStoppedTypingMutation(chatroomId, context) {
        const user = await this.userService.getUser(context.req.user.sub);
        await this.pubSub.publish(`userStoppedTyping.${chatroomId}`, {
            user,
            typingUserId: user.id,
        });
        return user;
    }
    async sendMessage(chatroomId, content, context, image) {
        let imagePath = null;
        if (image)
            imagePath = await this.chatroomService.saveImage(image);
        const newMessage = await this.chatroomService.sendMessage(chatroomId, content, context.req.user.sub, imagePath);
        await this.pubSub
            .publish(`newMessage.${chatroomId}`, { newMessage })
            .then((res) => {
            console.log('published', res);
        })
            .catch((err) => {
            console.log('err', err);
        });
        return newMessage;
    }
    async createChatroom(name, context) {
        return this.chatroomService.createChatroom(name, context.req.user.sub);
    }
    async addUsersToChatroom(chatroomId, userIds) {
        return this.chatroomService.addUsersToChatroom(chatroomId, userIds);
    }
    async getChatroomsForUser(userId) {
        return this.chatroomService.getChatroomsForUser(userId);
    }
    async getMessagesForChatroom(chatroomId) {
        return this.chatroomService.getMessagesForChatroom(chatroomId);
    }
    async deleteChatroom(chatroomId) {
        await this.chatroomService.deleteChatroom(chatroomId);
        return 'Chatroom deleted successfully';
    }
};
__decorate([
    (0, graphql_1.Subscription)((returns) => chatroom_types_1.Message, {
        nullable: true,
        resolve: (value) => value.newMessage,
    }),
    __param(0, (0, graphql_1.Args)('chatroomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatroomResolver.prototype, "newMessage", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_type_1.User, {
        nullable: true,
        resolve: (value) => value.user,
        filter: (payload, variables) => {
            console.log('payload1', variables, payload.typingUserId);
            return variables.userId !== payload.typingUserId;
        },
    }),
    __param(0, (0, graphql_1.Args)('chatroomId')),
    __param(1, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ChatroomResolver.prototype, "userStartedTyping", null);
__decorate([
    (0, graphql_1.Subscription)(() => user_type_1.User, {
        nullable: true,
        resolve: (value) => value.user,
        filter: (payload, variables) => {
            return variables.userId !== payload.typingUserId;
        },
    }),
    __param(0, (0, graphql_1.Args)('chatroomId')),
    __param(1, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ChatroomResolver.prototype, "userStoppedTyping", null);
__decorate([
    (0, common_1.UseFilters)(custom_exception_filter_1.GraphQLErrorFilter),
    (0, common_1.UseGuards)(graphql_auth_guard_1.GraphqlAuthGuard),
    (0, graphql_1.Mutation)((returns) => user_type_1.User),
    __param(0, (0, graphql_1.Args)('chatroomId')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatroomResolver.prototype, "userStartedTypingMutation", null);
__decorate([
    (0, common_1.UseFilters)(custom_exception_filter_1.GraphQLErrorFilter),
    (0, common_1.UseGuards)(graphql_auth_guard_1.GraphqlAuthGuard),
    (0, graphql_1.Mutation)(() => user_type_1.User, {}),
    __param(0, (0, graphql_1.Args)('chatroomId')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatroomResolver.prototype, "userStoppedTypingMutation", null);
__decorate([
    (0, common_1.UseGuards)(graphql_auth_guard_1.GraphqlAuthGuard),
    (0, graphql_1.Mutation)(() => chatroom_types_1.Message),
    __param(0, (0, graphql_1.Args)('chatroomId')),
    __param(1, (0, graphql_1.Args)('content')),
    __param(2, (0, graphql_1.Context)()),
    __param(3, (0, graphql_1.Args)('image', { type: () => GraphQLUpload, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object, typeof (_a = typeof GraphQLUpload !== "undefined" && GraphQLUpload) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ChatroomResolver.prototype, "sendMessage", null);
__decorate([
    (0, common_1.UseFilters)(custom_exception_filter_1.GraphQLErrorFilter),
    (0, common_1.UseGuards)(graphql_auth_guard_1.GraphqlAuthGuard),
    (0, graphql_1.Mutation)(() => chatroom_types_1.Chatroom),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatroomResolver.prototype, "createChatroom", null);
__decorate([
    (0, graphql_1.Mutation)(() => chatroom_types_1.Chatroom),
    __param(0, (0, graphql_1.Args)('chatroomId')),
    __param(1, (0, graphql_1.Args)('userIds', { type: () => [Number] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], ChatroomResolver.prototype, "addUsersToChatroom", null);
__decorate([
    (0, graphql_1.Query)(() => [chatroom_types_1.Chatroom]),
    __param(0, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatroomResolver.prototype, "getChatroomsForUser", null);
__decorate([
    (0, graphql_1.Query)(() => [chatroom_types_1.Message]),
    __param(0, (0, graphql_1.Args)('chatroomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatroomResolver.prototype, "getMessagesForChatroom", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('chatroomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatroomResolver.prototype, "deleteChatroom", null);
ChatroomResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [chatroom_service_1.ChatroomService,
        user_service_1.UserService])
], ChatroomResolver);
exports.ChatroomResolver = ChatroomResolver;
//# sourceMappingURL=chatroom.resolver.js.map