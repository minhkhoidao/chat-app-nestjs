import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updateProfile(userId: number, fullname: string, avatarUrl: string): Promise<{
        id: number;
        fullname: string;
        avatarUrl: string;
        email: string;
        emailVerifiedAt: Date;
        password: string;
        rememberToken: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    searchUsers(fullname: string, userId: number): Promise<{
        id: number;
        fullname: string;
        avatarUrl: string;
        email: string;
        emailVerifiedAt: Date;
        password: string;
        rememberToken: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUsersOfChatroom(chatroomId: number): Promise<{
        id: number;
        fullname: string;
        avatarUrl: string;
        email: string;
        emailVerifiedAt: Date;
        password: string;
        rememberToken: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUser(userId: number): Promise<{
        id: number;
        fullname: string;
        avatarUrl: string;
        email: string;
        emailVerifiedAt: Date;
        password: string;
        rememberToken: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
