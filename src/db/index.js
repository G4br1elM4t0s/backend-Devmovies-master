const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgres://devmovies:AEokZcgoReSWQ9FpZVTizMp6861YaAiN@dpg-ci752amnqql0ld9d0qq0-a.oregon-postgres.render.com/devmovies",
    },
  },
});

module.exports = prisma;
