const prisma = require("../../../../db");
const AppError = require("../../../../erros/AppErro");

class CreateMovieUseCase {
  async execute(
    userId,
    nameImg,
    size,
    name,
    description,
    thumbnail,
    streamersString,
    categoriesString,
    cast
  ) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user.role !== "ADM") {
      throw new AppError("Without Permission");
    }

    const categories = categoriesString.split(",").map((c) => c.trim());
    const streamers = streamersString.split(",").map((s) => s.trim());

    const existingCategories = await prisma.genre.findMany({
      where: {
        name: {
          in: categories,
        },
      },
    });

    const existingStreamers = await prisma.streamer.findMany({
      where: {
        name: {
          in: streamers,
        },
      },
    });

    const existingCategoryNames = existingCategories.map((c) => c.name);
    const existingStreamerNames = existingStreamers.map((s) => s.name);

    const invalidCategories = categories.filter(
      (c) => !existingCategoryNames.includes(c)
    );
    const invalidStreamers = streamers.filter(
      (s) => !existingStreamerNames.includes(s)
    );

    if (invalidCategories.length > 0) {
      throw new AppError(`Invalid categories: ${invalidCategories.join(", ")}`);
    }

    if (invalidStreamers.length > 0) {
      throw new AppError(`Invalid streamers: ${invalidStreamers.join(", ")}`);
    }

    const movie = await prisma.movie.create({
      data: {
        cast,
        nameImg,
        size,
        thumbnail,
        name,
        description,
        genres: {
          connect: existingCategories.map((c) => ({ id: c.id })),
        },
        streamers: {
          connect: existingStreamers.map((s) => ({ id: s.id })),
        },
      },
    });

    return movie;
  }
}

module.exports = CreateMovieUseCase;
