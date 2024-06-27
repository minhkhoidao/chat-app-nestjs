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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, prisma, configService) {
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.configService = configService;
    }
    async refreshToken(req, res) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token not found');
        }
        let payload;
        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('REFRESH_TOKEN_SECRET'),
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        const userExists = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });
        if (!userExists) {
            throw new common_1.BadRequestException('User no longer exists');
        }
        const expiresIn = 15000;
        const expiration = Math.floor(Date.now() / 1000) + expiresIn;
        const accessToken = this.jwtService.sign(Object.assign(Object.assign({}, payload), { exp: expiration }), {
            secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        });
        res.cookie('access_token', accessToken, { httpOnly: true });
        return accessToken;
    }
    async issueTokens(user, response) {
        const payload = { username: user.fullname, sub: user.id };
        const accessToken = this.jwtService.sign(Object.assign({}, payload), {
            secret: this.configService.get('ACCESS_TOKEN_SECRET'),
            expiresIn: '150sec',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
            expiresIn: '7d',
        });
        response.cookie('access_token', accessToken, { httpOnly: true });
        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
        });
        return { user };
    }
    async validateUser(loginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email },
        });
        if (user && (await bcrypt.compare(loginDto.password, user.password))) {
            return user;
        }
        return null;
    }
    async register(registerDto, response) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException({ email: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                fullname: registerDto.fullname,
                password: hashedPassword,
                email: registerDto.email,
            },
        });
        return this.issueTokens(user, response);
    }
    async login(loginDto, response) {
        const user = await this.validateUser(loginDto);
        if (!user) {
            throw new common_1.BadRequestException({
                invalidCredentials: 'Invalid credentials',
            });
        }
        return this.issueTokens(user, response);
    }
    async logout(response) {
        response.clearCookie('access_token');
        response.clearCookie('refresh_token');
        return 'Successfully logged out';
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map