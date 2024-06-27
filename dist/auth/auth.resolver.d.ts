import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Request, Response } from 'express';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto, context: {
        res: Response;
    }): Promise<{
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
    }>;
    login(loginDto: LoginDto, context: {
        res: Response;
    }): Promise<{
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
    }>;
    logout(context: {
        res: Response;
    }): Promise<string>;
    hello(): Promise<string>;
    refreshToken(context: {
        req: Request;
        res: Response;
    }): Promise<string>;
}
