const CreateRatingUseCase = require("../../models/rating/useCase/CreateRatingUseCase");

class CreateRatingController {
  async handle(req, res) {
    try {
      const { userId, type } = req.body;
      const { movieName } = req.params;

      console.log(movieName);

      const createRatingUseCase = new CreateRatingUseCase();

      const result = await createRatingUseCase.execute(userId, movieName, type);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CreateRatingController;
