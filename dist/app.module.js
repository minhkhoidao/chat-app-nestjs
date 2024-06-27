"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const chatroom_module_1 = require("./chatroom/chatroom.module");
const live_chatroom_module_1 = require("./live-chatroom/live-chatroom.module");
const pubSub = new graphql_redis_subscriptions_1.RedisPubSub({
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        retryStrategy: (times) => {
            return Math.min(times * 50, 2000);
        },
    },
});
let AppModule = AppModule_1 = class AppModule {
};
AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/',
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            graphql_1.GraphQLModule.forRootAsync({
                imports: [config_1.ConfigModule, AppModule_1],
                inject: [config_1.ConfigService],
                driver: apollo_1.ApolloDriver,
                useFactory: async (configService, tokenService) => {
                    return {
                        installSubscriptionHandlers: true,
                        playground: true,
                        autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                        sortSchema: true,
                        subscriptions: {
                            'graphql-ws': true,
                            'subscriptions-transport-ws': true,
                        },
                        onConnect: (connectionParams) => {
                            const token = tokenService.extractToken(connectionParams);
                            if (!token) {
                                throw new Error('Token not provided');
                            }
                            const user = tokenService.validateToken(token);
                            if (!user) {
                                throw new Error('Invalid token');
                            }
                            return { user };
                        },
                        context: ({ req, res, connection }) => {
                            if (connection) {
                                return { req, res, user: connection.context.user, pubSub };
                            }
                            return { req, res };
                        },
                    };
                },
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            chatroom_module_1.ChatroomModule,
            live_chatroom_module_1.LiveChatroomModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map