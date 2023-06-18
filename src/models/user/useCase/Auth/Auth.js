const prisma = require("../../../../db");
const AppError = require("../../../../erros/AppErro");

class Auth {
  async execute({ email, password }) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.password !== password) {
      throw new AppError("password does not match", 401);
    }

    return user;
  }
}

module.exports = Auth;
