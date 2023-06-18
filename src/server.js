const app = require("./app");
const port = process.env.PORT || 3000;

const server = app.listen(port, (req, res) => {
  console.log(`rodando na porta ${port}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("Servidor fechado :D");
});
