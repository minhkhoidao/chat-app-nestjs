import { User } from '../user/user.type';
export declare class LiveChatroomService {
    private redisClient;
    constructor();
    addLiveUserToChatroom(chatroomId: number, user: User): Promise<void>;
    removeLiveUserFromChatroom(chatroomId: number, user: User): Promise<void>;
    getLiveUsersForChatroom(chatroomId: number): Promise<User[]>;
}
