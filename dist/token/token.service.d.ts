import { ConfigService } from '@nestjs/config';
export declare class TokenService {
    private configService;
    constructor(configService: ConfigService);
    extractToken(connectionParams: any): string | null;
    validateToken(token: string): any;
}
