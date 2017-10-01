import { Database } from "sqlite";

import { UserData } from "../common/types";
import { encrypt, decrypt } from "../common/crypto";

const init = (database: Database, force?: string) => {
  database.migrate({
    // force: 'last' (default false) will force the migration API to rollback
    // and re-apply the latest migration over again each time when Node.js app launches.
    force,
    migrationsPath: `${__dirname}/common/db/migrations`
  });
  return database;
};

const addUser = (database: Database, user: UserData) => {
  return database
    .exec("BEGIN")
    .then(() =>
      database.run(
        "INSERT INTO users(twitch_name, twitch_oauth) VALUES (?,?,?)",
        [user.name, encrypt(user.oauth)]
      )
    )
    .then(() => database.exec("COMMIT"))
    .catch(err => {
      console.error(err);
      database.exec("ROLLBACK");
    });
};

const getUser = (database: Database, userID: string): Promise<UserData> => {
  return database
    .get("SELECT * FROM users WHERE user = ?", [userID])
    .then(row => {
      return {
        name: row.twitch_name,
        oauth: decrypt(row.twitch_oauth)
      };
    });
};

export { init, addUser, getUser };
