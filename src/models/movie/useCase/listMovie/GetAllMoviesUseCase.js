const prisma = require("../../../../db");

class GetAllMoviesUseCase {
  async execute() {
    const movies = await prisma.movie.findMany({
      include: {
        genres: true,
        streamers: true,
        likes: true,
      },
    });
    return movies;
  }
}

module.exports = GetAllMoviesUseCase;
