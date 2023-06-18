const ListLikeUseCase = require("../../models/like/useCase/listLikes/ListLikeUseCase");

class ListLikeController {
  async handle(req, res) {
    const { userId } = req.params;

    const listLikeUseCase = new ListLikeUseCase();

    const result = await listLikeUseCase.execute(userId);

    res.status(200).send(result);
  }
}

module.exports = ListLikeController;
