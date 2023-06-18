const prisma = require("../../../../db");
const AppError = require("../../../../erros/AppErro");

class CreateUserUseCase {
  async execute({ name, email, password }) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }
}

module.exports = CreateUserUseCase;
