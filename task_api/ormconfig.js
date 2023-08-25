module.exports = process.env.DATABASE_URL
  ? {
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: true,
      logging: false,
      entities: ["./src/entity/Event.ts"],
      migrations: [],
      subscribers: [],
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      type: "postgres",
      url: "postgres://postgres:postgress@localhost:5433/events_db",
      synchronize: true,
      logging: false,
      entities: ["./src/entity/Event.ts"],
      migrations: [],
      subscribers: [],
    };
