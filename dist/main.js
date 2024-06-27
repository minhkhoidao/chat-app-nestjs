"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
        allowedHeaders: [
            'Accept',
            'Authorization',
            'Content-Type',
            'X-Requested-With',
            'apollo-require-preflight',
        ],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    });
    app.use(cookieParser());
    app.use(graphqlUploadExpress({ maxFileSize: 10000000000, maxFiles: 1 }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => {
            const formattedErrors = errors.reduce((accumulator, error) => {
                accumulator[error.property] = Object.values(error.constraints).join(', ');
                return accumulator;
            }, {});
            throw new common_1.BadRequestException(formattedErrors);
        },
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map