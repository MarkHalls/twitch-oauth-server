import sqlite from "sqlite";
import express from "express";

import { init } from "./db/database";
import { TokenOptions, getAuthorizeUrl, generateStateToken} from "./common/oauth";
import auth from "./common/config/auth.json";

const app = express();

const db = sqlite.open(`${__dirname}/common/db/sqlite.db`);

db.then(database => init(database, "last")).then();

app.get("/authorize", async () => {
  const options: TokenOptions = {
    redirect_uri: auth.redirect_uri,
    scope: auth.scope,
    state: await generateStateToken() 
  };
  getAuthorizeUrl(auth.client_id, options);
});

app.listen(3000);
