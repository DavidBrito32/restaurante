import knex from "knex";
import dotenv from "dotenv";
import { Database } from "sqlite3";
dotenv.config();

export abstract class Db {
  public static connection = knex({
    client: "sqlite3",
    connection: {
      filename:
        (process.env.DB_FILE_PATH as string) || "./src/database/social.db",
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
      afterCreate: (conn: Database, cb: (err: Error | null) => void) => {
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
  });
}
