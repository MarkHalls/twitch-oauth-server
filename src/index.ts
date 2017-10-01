import sqlite from "sqlite";

import { init } from "./db/database";

const db = sqlite.open(`${__dirname}/common/db/sqlite.db`);
db.then(database => init(database, "last")).then();

if (process.getuid !== 0) {
  console.err("Error: You must be root");
}
try {
  process.setuid("myuser");
  console.log("UID: ", process.getuid());
} catch (err) {
  console.error(err);
}
