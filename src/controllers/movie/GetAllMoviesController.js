const GetAllMoviesUseCase = require("../../models/movie/useCase/listMovie/GetAllMoviesUseCase");

class GetAllMoviesController {
  async handle(req, res) {
    try {
      const getAllMoviesUseCase = new GetAllMoviesUseCase();

      const result = await getAllMoviesUseCase.execute();

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = GetAllMoviesController;
