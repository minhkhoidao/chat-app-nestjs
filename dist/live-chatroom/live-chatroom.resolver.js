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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveChatroomResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const user_type_1 = require("../user/user.type");
const live_chatroom_service_1 = require("./live-chatroom.service");
const user_service_1 = require("../user/user.service");
const graphql_2 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const graphql_auth_guard_1 = require("../auth/graphql-auth.guard");
const custom_exception_filter_1 = require("../filters/custom-exception.filter");
let LiveChatroomResolver = class LiveChatroomResolver {
    constructor(liveChatroomService, userService) {
        this.liveChatroomService = liveChatroomService;
        this.userService = userService;
        this.pubSub = new graphql_subscriptions_1.PubSub();
    }
    liveUsersInChatroom(chatroomId) {
        return this.pubSub.asyncIterator(`liveUsersInChatroom.${chatroomId}`);
    }
    async enterChatroom(chatroomId, context) {
        const user = await this.userService.getUser(context.req.user.sub);
        await this.liveChatroomService.addLiveUserToChatroom(chatroomId, user);
        const liveUsers = await this.liveChatroomService
            .getLiveUsersForChatroom(chatroomId)
            .catch((err) => {
            console.log('getLiveUsersForChatroom error', err);
        });
        await this.pubSub
            .publish(`liveUsersInChatroom.${chatroomId}`, {
            liveUsers,
            chatroomId,
        })
            .catch((err) => {
            console.log('pubSub error', err);
        });
        return true;
    }
    async leaveChatroom(chatroomId, context) {
        const user = await this.userService.getUser(context.req.user.sub);
        await this.liveChatroomService.removeLiveUserFromChatroom(chatroomId, user);
        const liveUsers = await this.liveChatroomService.getLiveUsersForChatroom(chatroomId);
        await this.pubSub.publish(`liveUsersInChatroom.${chatroomId}`, {
            liveUsers,
            chatroomId,
        });
        return true;
    }
};
__decorate([
    (0, graphql_2.Subscription)(() => [user_type_1.User], {
        nullable: true,
        resolve: (value) => value.liveUsers,
        filter: (payload, variables) => {
            return payload.chatroomId === variables.chatroomId;
        },
    }),
    __param(0, (0, graphql_2.Args)('chatroomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LiveChatroomResolver.prototype, "liveUsersInChatroom", null);
__decorate([
    (0, common_1.UseFilters)(custom_exception_filter_1.GraphQLErrorFilter),
    (0, common_1.UseGuards)(graphql_auth_guard_1.GraphqlAuthGuard),
    (0, graphql_2.Mutation)(() => Boolean),
    __param(0, (0, graphql_2.Args)('chatroomId')),
    __param(1, (0, graphql_2.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LiveChatroomResolver.prototype, "enterChatroom", null);
__decorate([
    (0, common_1.UseFilters)(custom_exception_filter_1.GraphQLErrorFilter),
    (0, common_1.UseGuards)(graphql_auth_guard_1.GraphqlAuthGuard),
    (0, graphql_2.Mutation)(() => Boolean),
    __param(0, (0, graphql_2.Args)('chatroomId')),
    __param(1, (0, graphql_2.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LiveChatroomResolver.prototype, "leaveChatroom", null);
LiveChatroomResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [live_chatroom_service_1.LiveChatroomService,
        user_service_1.UserService])
], LiveChatroomResolver);
exports.LiveChatroomResolver = LiveChatroomResolver;
//# sourceMappingURL=live-chatroom.resolver.js.map