import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.account.create({
    data: {
      username: "1245",
    },
  });

  const allUsers = await prisma.account.findMany();
  console.log(allUsers);
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
