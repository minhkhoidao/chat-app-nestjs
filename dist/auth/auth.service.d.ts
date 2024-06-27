import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { LoginDto, RegisterDto } from './dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly prisma;
    private readonly configService;
    constructor(jwtService: JwtService, prisma: PrismaService, configService: ConfigService);
    refreshToken(req: Request, res: Response): Promise<string>;
    private issueTokens;
    validateUser(loginDto: LoginDto): Promise<{
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
    register(registerDto: RegisterDto, response: Response): Promise<{
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
    login(loginDto: LoginDto, response: Response): Promise<{
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
    logout(response: Response): Promise<string>;
}
