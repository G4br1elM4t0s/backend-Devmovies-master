const prisma = require("../../../db");
const AppError = require("../../../erros/AppErro");

class ListRatingUseCase {
  async execute({ userId }) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user) {
      const rating = await prisma.rating.findMany({
        where: {
          user,
        },
      });
    } else {
      throw new AppError("Usuario não encontrado");
    }
  }
}
