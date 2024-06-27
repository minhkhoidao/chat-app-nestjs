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
exports.ChatroomService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs_1 = require("fs");
const prisma_service_1 = require("../prisma.service");
let ChatroomService = class ChatroomService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async getChatroom(id) {
        return this.prisma.chatroom.findUnique({
            where: {
                id: parseInt(id),
            },
        });
    }
    async createChatroom(name, sub) {
        const existingChatroom = await this.prisma.chatroom.findFirst({
            where: {
                name,
            },
        });
        if (existingChatroom) {
            throw new common_1.BadRequestException({ name: 'Chatroom already exists' });
        }
        return this.prisma.chatroom.create({
            data: {
                name,
                users: {
                    connect: {
                        id: sub,
                    },
                },
            },
        });
    }
    async addUsersToChatroom(chatroomId, userIds) {
        const existingChatroom = await this.prisma.chatroom.findUnique({
            where: {
                id: chatroomId,
            },
        });
        if (!existingChatroom) {
            throw new common_1.BadRequestException({ chatroomId: 'Chatroom does not exist' });
        }
        return await this.prisma.chatroom.update({
            where: {
                id: chatroomId,
            },
            data: {
                users: {
                    connect: userIds.map((id) => ({ id: id })),
                },
            },
            include: {
                users: true,
            },
        });
    }
    async getChatroomsForUser(userId) {
        return this.prisma.chatroom.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: {
                users: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                messages: {
                    take: 1,
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
    }
    async sendMessage(chatroomId, message, userId, imagePath) {
        return await this.prisma.message.create({
            data: {
                content: message,
                imageUrl: imagePath,
                chatroomId,
                userId,
            },
            include: {
                chatroom: {
                    include: {
                        users: true,
                    },
                },
                user: true,
            },
        });
    }
    async saveImage(image) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(image.mimetype)) {
            throw new common_1.BadRequestException({ image: 'Invalid image type' });
        }
        const imageName = `${Date.now()}-${image.filename}`;
        const imagePath = `${this.configService.get('IMAGE_PATH')}/${imageName}`;
        const stream = image.createReadStream();
        const outputPath = `public${imagePath}`;
        const writeStream = (0, fs_1.createWriteStream)(outputPath);
        stream.pipe(writeStream);
        await new Promise((resolve, reject) => {
            stream.on('end', resolve);
            stream.on('error', reject);
        });
        return imagePath;
    }
    async getMessagesForChatroom(chatroomId) {
        return await this.prisma.message.findMany({
            where: {
                chatroomId: chatroomId,
            },
            include: {
                chatroom: {
                    include: {
                        users: {
                            orderBy: {
                                createdAt: 'asc',
                            },
                        },
                    },
                },
                user: true,
            },
        });
    }
    async deleteChatroom(chatroomId) {
        return this.prisma.chatroom.delete({
            where: {
                id: chatroomId,
            },
        });
    }
};
ChatroomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], ChatroomService);
exports.ChatroomService = ChatroomService;
//# sourceMappingURL=chatroom.service.js.map