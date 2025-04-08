"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield client.users.create({
            data: {
                username: "kir23",
                password: "securepass123",
                age: 21,
                city: "Chandigarh",
                todos: {
                    create: [
                        {
                            title: "Finish backend setup",
                            description: "Complete Prisma schema and migrations",
                            done: false,
                        },
                        {
                            title: "UI Design",
                            description: "Create Figma wireframes for dashboard",
                            done: true,
                        },
                    ],
                },
            },
            include: {
                todos: true,
            },
        });
        console.log("User created:", newUser);
    });
}
main();
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.users.findFirst({
            where: {
                id: 1,
            },
            include: {
                todos: true,
            },
        });
        console.log(user);
    });
}
createUser();
