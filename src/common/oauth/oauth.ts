import api from "twitch-api-v5";

api.clientID = "clientID";
const data = {
  clientSecret: secret,
  redirectURI: "http://oauth.alwaysbecrafting.stream",
  code
};

api.auth.getAccessToken(data, () => {});
