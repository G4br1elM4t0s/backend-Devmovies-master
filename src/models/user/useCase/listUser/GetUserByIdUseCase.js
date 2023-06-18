const prisma = require("../../../../db");
const AppError = require("../../../../erros/AppErro");

class GetUserByIdUseCase {
  async execute({ userId }) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        likes: {
          include: {
            movie: {
              include: {
                streamers: true,
              },
            },
          },
        },
      },
    });
    if (user) {
      return user;
    }
    throw new AppError("User não encontrado");
  }
}

module.exports = GetUserByIdUseCase;
