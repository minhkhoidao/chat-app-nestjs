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
exports.LiveChatroomService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let LiveChatroomService = class LiveChatroomService {
    constructor() {
        this.redisClient = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
        });
    }
    async addLiveUserToChatroom(chatroomId, user) {
        const existingLiveUsers = await this.getLiveUsersForChatroom(chatroomId);
        const existingUser = existingLiveUsers.find((liveUser) => liveUser.id === user.id);
        if (existingUser) {
            return;
        }
        await this.redisClient.sadd(`liveUsers:chatroom:${chatroomId}`, JSON.stringify(user));
    }
    async removeLiveUserFromChatroom(chatroomId, user) {
        await this.redisClient
            .srem(`liveUsers:chatroom:${chatroomId}`, JSON.stringify(user))
            .catch((err) => {
            console.log('removeLiveUserFromChatroom error', err);
        })
            .then((res) => {
            console.log('removeLiveUserFromChatroom res', res);
        });
    }
    async getLiveUsersForChatroom(chatroomId) {
        const users = await this.redisClient.smembers(`liveUsers:chatroom:${chatroomId}`);
        return users.map((user) => JSON.parse(user));
    }
};
LiveChatroomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LiveChatroomService);
exports.LiveChatroomService = LiveChatroomService;
//# sourceMappingURL=live-chatroom.service.js.map