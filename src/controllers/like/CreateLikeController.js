const CreateLikeUseCase = require("../../models/like/useCase/createLike/CreateLikeUseCase");

class CreateLikeController {
  async handle(req, res) {
    try {
      const { userId } = req.params;
      const { movieId, liked } = req.body;

      console.log(userId);

      const createLikeUseCase = new CreateLikeUseCase();

      const result = await createLikeUseCase.execute(userId, movieId, liked);

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = CreateLikeController;
