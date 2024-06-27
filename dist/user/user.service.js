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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const fs = require("fs");
const path_1 = require("path");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateProfile(userId, fullname, avatarUrl) {
        if (avatarUrl) {
            const oldUser = await this.prisma.user.findUnique({
                where: { id: userId },
            });
            const updatedUser = await this.prisma.user.update({
                where: { id: userId },
                data: {
                    fullname,
                    avatarUrl,
                },
            });
            if (oldUser.avatarUrl) {
                const imageName = oldUser.avatarUrl.split('/').pop();
                const imagePath = (0, path_1.join)(__dirname, '..', '..', 'public', 'images', imageName);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            return updatedUser;
        }
        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                fullname,
            },
        });
    }
    async searchUsers(fullname, userId) {
        return this.prisma.user.findMany({
            where: {
                fullname: {
                    contains: fullname,
                },
                id: {
                    not: userId,
                },
            },
        });
    }
    async getUsersOfChatroom(chatroomId) {
        return this.prisma.user.findMany({
            where: {
                chatrooms: {
                    some: {
                        id: chatroomId,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getUser(userId) {
        return this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map