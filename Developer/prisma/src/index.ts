import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

async function main() {
  const newUser = await client.users.create({
    data: {
      username: "kirti123",
      password: "securepass123",
      age: 21,
      city: "Chandigarh",
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
