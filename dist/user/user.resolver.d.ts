import { UserService } from './user.service';
import { Request } from 'express';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    updateProfile(fullname: string, file: GraphQLUpload.FileUpload, context: {
        req: Request;
    }): Promise<{
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
    private storeImageAndGetUrl;
    searchUsers(fullname: string, context: {
        req: Request;
    }): Promise<{
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
}
