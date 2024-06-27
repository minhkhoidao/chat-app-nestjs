import { ChatroomService } from './chatroom.service';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { PubSub } from 'graphql-subscriptions';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
export declare class ChatroomResolver {
    private readonly chatroomService;
    private readonly userService;
    pubSub: PubSub;
    constructor(chatroomService: ChatroomService, userService: UserService);
    newMessage(chatroomId: number): AsyncIterator<unknown, any, undefined>;
    userStartedTyping(chatroomId: number, userId: number): AsyncIterator<unknown, any, undefined>;
    userStoppedTyping(chatroomId: number, userId: number): AsyncIterator<unknown, any, undefined>;
    userStartedTypingMutation(chatroomId: number, context: {
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
    userStoppedTypingMutation(chatroomId: number, context: {
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
    sendMessage(chatroomId: number, content: string, context: {
        req: Request;
    }, image?: GraphQLUpload): Promise<{
        user: {
            id: number;
            fullname: string;
            avatarUrl: string;
            email: string;
            emailVerifiedAt: Date;
            password: string;
            rememberToken: string;
            createdAt: Date;
            updatedAt: Date;
        };
        chatroom: {
            users: {
                id: number;
                fullname: string;
                avatarUrl: string;
                email: string;
                emailVerifiedAt: Date;
                password: string;
                rememberToken: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        content: string;
        imageUrl: string;
        userId: number;
        chatroomId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createChatroom(name: string, context: {
        req: Request;
    }): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addUsersToChatroom(chatroomId: number, userIds: number[]): Promise<{
        users: {
            id: number;
            fullname: string;
            avatarUrl: string;
            email: string;
            emailVerifiedAt: Date;
            password: string;
            rememberToken: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getChatroomsForUser(userId: number): Promise<({
        messages: {
            id: number;
            content: string;
            imageUrl: string;
            userId: number;
            chatroomId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        users: {
            id: number;
            fullname: string;
            avatarUrl: string;
            email: string;
            emailVerifiedAt: Date;
            password: string;
            rememberToken: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getMessagesForChatroom(chatroomId: number): Promise<({
        user: {
            id: number;
            fullname: string;
            avatarUrl: string;
            email: string;
            emailVerifiedAt: Date;
            password: string;
            rememberToken: string;
            createdAt: Date;
            updatedAt: Date;
        };
        chatroom: {
            users: {
                id: number;
                fullname: string;
                avatarUrl: string;
                email: string;
                emailVerifiedAt: Date;
                password: string;
                rememberToken: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        content: string;
        imageUrl: string;
        userId: number;
        chatroomId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    deleteChatroom(chatroomId: number): Promise<string>;
}
