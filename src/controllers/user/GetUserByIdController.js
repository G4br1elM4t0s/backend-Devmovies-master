const GetUserByIdUseCase = require("../../models/user/useCase/listUser/GetUserByIdUseCase");

class GetUserByIdController {
  async handle(req, res) {
    try {
      const { userId } = req.params;

      const getUserByIdUseCase = new GetUserByIdUseCase();

      const result = await getUserByIdUseCase.execute({ userId });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = GetUserByIdController;
