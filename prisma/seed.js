const  { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      nome: "teste",
      email: "teste@example.com",
      senha: "123456",
      cpf: "12345678910"
    }
  });
}

main().finally(() => prisma.$disconnect());
