const prisma = require("../../../db");
const AppError = require("../../../erros/AppErro");

class CreateRatingUseCase {
  async execute(userId, movieName, type) {
    const validCategories = ["assistido", "assistir", "gostei", "nao-gostei"];

    if (!validCategories.includes(type)) {
      throw new AppError("Invalid Category");
    }

    const movie = await prisma.movie.findUnique({
      where: {
        name: movieName,
      },
    });

    if (!movie) {
      throw new AppError("Movie is not found", 404);
    }

    const existingRating = await prisma.rating.findFirst({
      where: {
        userId: { equals: userId },
        movieId: { equals: movie.id },
      },
    });

    if (existingRating) {
      const ratingTypes = existingRating.type.split(",");

      if (ratingTypes.includes(type)) {
        return existingRating;
      }

      let updatedTypes = [...ratingTypes];

      if (type === "gostei" && ratingTypes.includes("nao-gostei")) {
        updatedTypes = updatedTypes.filter((t) => t !== "nao-gostei");
      } else if (type === "nao-gostei" && ratingTypes.includes("gostei")) {
        updatedTypes = updatedTypes.filter((t) => t !== "gostei");
      } else if (type === "assistido" && ratingTypes.includes("assistir")) {
        updatedTypes = updatedTypes.filter((t) => t !== "assistir");
      } else if (type === "assistir" && ratingTypes.includes("assistido")) {
        updatedTypes = updatedTypes.filter((t) => t !== "assistido");
      }

      updatedTypes.push(type);

      const updatedRating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: {
          type: updatedTypes.join(","),
        },
      });

      return updatedRating;
    } else {
      const newRating = await prisma.rating.create({
        data: {
          type,
          userId,
          movieId: movie.id,
        },
      });
      return newRating;
    }
  }
}

module.exports = CreateRatingUseCase;
