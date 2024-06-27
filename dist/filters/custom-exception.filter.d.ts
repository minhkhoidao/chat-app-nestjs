import { BadRequestException } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
export declare class GraphQLErrorFilter implements GqlExceptionFilter {
    catch(exception: BadRequestException): void;
}
