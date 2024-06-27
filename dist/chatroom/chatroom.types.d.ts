import { User } from 'src/user/user.type';
export declare class Chatroom {
    id?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    users?: User[];
    messages?: Message[];
}
export declare class Message {
    id?: string;
    imageUrl?: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
    chatroom?: Chatroom;
    user?: User;
}
export declare class UserTyping {
    user?: User;
    chatroomId?: number;
}
export declare class UserStoppedTyping extends UserTyping {
}
