"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const apollo_server_express_1 = require("apollo-server-express");
let GraphQLErrorFilter = class GraphQLErrorFilter {
    catch(exception) {
        const response = exception.getResponse();
        if (typeof response === "object") {
            throw new apollo_server_express_1.ApolloError("Validation error", "VALIDATION_ERROR", response);
        }
        else {
            throw new apollo_server_express_1.ApolloError("Bad Request");
        }
    }
};
GraphQLErrorFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], GraphQLErrorFilter);
exports.GraphQLErrorFilter = GraphQLErrorFilter;
//# sourceMappingURL=custom-exception.filter.js.map