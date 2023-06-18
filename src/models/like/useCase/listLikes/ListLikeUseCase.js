const prisma = require("../../../../db");
const AppError = require("../../../../erros/AppErro");

class ListLikeUseCase {
  async execute(userId) {
    const likes = await prisma.like.findMany({
      where: {
        userId: userId,
      },
      include: {
        movie: true,
      },
    });

    return likes;
  }
}

module.exports = ListLikeUseCase;
