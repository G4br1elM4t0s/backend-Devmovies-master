const prisma = require("../../../../db");
const AppError = require("../../../../erros/AppErro");

class CreateLikeUseCase {
  async execute(userId, movieId, liked) {
    console.log("dentro do createLikeUseCase " + userId);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new AppError("Movie not found", 404);
    }

    const like = await prisma.like.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        movie: {
          connect: {
            id: movie.id,
          },
        },
        liked,
      },
    });

    return like;
  }
}

module.exports = CreateLikeUseCase;
