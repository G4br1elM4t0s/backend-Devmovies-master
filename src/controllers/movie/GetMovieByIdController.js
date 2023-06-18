const GetMovieByIdUseCase = require("../../models/movie/useCase/listMovie/GetMovieByIdUseCase");

class GetMovieByIdController {
  async handle(req, res) {
    try {
      const { id } = req.params;

      const getMovieByIdUseCase = new GetMovieByIdUseCase();

      const result = await getMovieByIdUseCase.execute(id);

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = GetMovieByIdController;
