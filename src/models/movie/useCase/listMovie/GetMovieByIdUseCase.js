const prisma = require("../../../../db");
const AppError = require("../../../../erros/AppErro");

class GetMovieByIdUseCase {
  async execute(id) {
    const movie = await prisma.movie.findUnique({
      where: {
        id,
      },
      include: {
        genres: true,
        streamers: true,
        likes: true,
      },
    });

    if (!movie) {
      throw new AppError("Movie not found");
    }

    return movie;
  }
}

module.exports = GetMovieByIdUseCase;
