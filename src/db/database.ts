import * as sqlite from "sqlite";

const init = () => {
  Promise.resolve()
    .then(() => sqlite.open(`${__dirname}/common/db/sqlite.db`))
    .then(() =>
      sqlite.migrate({
        // force: 'last' (default false) will force the migration API to rollback
        // and re-apply the latest migration over again each time when Node.js app launches.
        force: "last",
        migrationsPath: `${__dirname}/common/db/migrations`
      })
    )
    .catch(console.error);
};

const addUser = (id: string, twitchName: string, twitchOauth: string) => {
  console.log(id, twitchName, twitchOauth);
};

init();

export { addUser };
