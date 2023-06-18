const Auth = require("../../models/user/useCase/Auth/Auth");

class AuthController {
  async handle(req, res) {
    try {
      const { email, password } = req.body;

      const auth = new Auth();

      const result = await auth.execute({ email, password });

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AuthController;
