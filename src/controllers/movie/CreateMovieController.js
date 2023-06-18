const CreateMovieUseCase = require("../../models/movie/useCase/createMovie/CreateMovieUseCase");

class CreateMovieController {
  async handle(req, res) {
    try {
      console.log(req);

      const { originalname: nameImg, filename: thumbnail, size } = req.file;

      const { name, description, streamersString, categoriesString, cast } =
        req.body;
      const { userId } = req.params;

      const createMovieUseCase = new CreateMovieUseCase();

      const result = await createMovieUseCase.execute(
        userId,
        nameImg,
        size,
        name,
        description,
        thumbnail,
        streamersString,
        categoriesString,
        cast
      );
      res.status(201).send(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CreateMovieController;
