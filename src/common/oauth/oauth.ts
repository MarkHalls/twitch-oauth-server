import { stringify } from "querystring";
import crypto from "crypto";
import { promisify } from "util";

type Scope =
  | "channel_check_subscription"
  | "channel_commercial"
  | "channel_editor"
  | "channel_feed_edit"
  | "channel_feed_read"
  | "channel_read"
  | "channel_stream"
  | "channel_subscriptions"
  | "chat_login"
  | "collections_edit"
  | "communities_edit"
  | "communities_moderate"
  | "openid"
  | "user_blocks_edit"
  | "user_blocks_read"
  | "user_follows_edit"
  | "user_read"
  | "user_subscriptions"
  | "viewing_activity_read";

interface TokenOptions {
  redirect_uri: string;
  scope: Scope[];
  state: string;
}
const getAuthorizeUrl = (client_id: string, opts: TokenOptions): string => {
  const query = stringify({
    client_id,
    redirect_uri: opts.redirect_uri,
    scope: opts.scope.join(" "),
    response_type: "code",
    state: opts.state,
  })
  return `https://api.twitch.tv/kraken/oauth2/authorize?${query}`;
}

const randomBytes = promisify(crypto.randomBytes);
const generateStateToken = () => (
  randomBytes(16).then(buf => buf.toString("hex"))
);

export { Scope, TokenOptions, getAuthorizeUrl, generateStateToken };
