import { Scope } from "../oauth";

interface Auth {
  client_id: string;
  redirect_uri: string;
  scope: Scope[];
}

declare const json: Auth;

export default json;
