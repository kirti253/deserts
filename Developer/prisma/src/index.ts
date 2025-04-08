import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

async function main() {
  const newUser = await client.users.create({
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
}

main();
async function createUser() {
  const user = await client.users.findFirst({
    where: {
      id: 1,
    },
    include: {
      todos: true,
    },
  });
  console.log(user);
}

createUser();
