import { LiveChatroomService } from './live-chatroom.service';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
export declare class LiveChatroomResolver {
    private readonly liveChatroomService;
    private readonly userService;
    private pubSub;
    constructor(liveChatroomService: LiveChatroomService, userService: UserService);
    liveUsersInChatroom(chatroomId: number): AsyncIterator<unknown, any, undefined>;
    enterChatroom(chatroomId: number, context: {
        req: Request;
    }): Promise<boolean>;
    leaveChatroom(chatroomId: number, context: {
        req: Request;
    }): Promise<boolean>;
}
