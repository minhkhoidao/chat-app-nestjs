"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatroomModule = void 0;
const common_1 = require("@nestjs/common");
const chatroom_service_1 = require("./chatroom.service");
const chatroom_resolver_1 = require("./chatroom.resolver");
const prisma_service_1 = require("../prisma.service");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
let ChatroomModule = class ChatroomModule {
};
ChatroomModule = __decorate([
    (0, common_1.Module)({
        providers: [
            chatroom_service_1.ChatroomService,
            chatroom_resolver_1.ChatroomResolver,
            prisma_service_1.PrismaService,
            user_service_1.UserService,
            jwt_1.JwtService,
        ],
    })
], ChatroomModule);
exports.ChatroomModule = ChatroomModule;
//# sourceMappingURL=chatroom.module.js.map