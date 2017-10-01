-- Up
CREATE TABLE config (
	id								INTEGER			PRIMARY KEY,
	bot_name					TEXT				COLLATE NOCASE,
	twitch_client_id	TEXT				COLLATE BINARY,
	twitch_bot_token	TEXT				COLLATE BINARY,
	discord_bot_token	TEXT				COLLATE BINARY,

)

CREATE TABLE users (
	id								INTEGER			PRIMARY KEY,
	twitch_name				TEXT				COLLATE NOCASE,
	twitch_oauth			TEXT				COLLATE NOCASE
);

-- Down
DROP TABLE config;
DROP TABLE users;