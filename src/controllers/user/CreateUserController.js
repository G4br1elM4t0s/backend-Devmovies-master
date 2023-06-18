const CreateUserUseCase = require("../../models/user/useCase/createUser/CreateUserUseCase");

class CreateUserController {
  async handle(req, res) {
    const { name, email, password } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({ name, email, password });

    return res.status(201).json(result);
  }
}

module.exports = CreateUserController;
