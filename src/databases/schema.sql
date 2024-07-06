CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_status AS ENUM (
  'active',
  'inactive',
  'banned',
  'deleted'
);

-- Enum type for player color
CREATE TYPE player_color AS ENUM ('white', 'black');

CREATE TYPE game_result AS ENUM ('win', 'loss', 'draw');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  status user_status DEFAULT 'active' NOT NULL,
  rank INTEGER DEFAULT 1500 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metadata JSONB,
  winner_id UUID REFERENCES users(id),
  winner_color player_color,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE game_players (
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  color player_color NOT NULL,
  rank_at_time_of_play INTEGER,
  game_result game_result NOT NULL,
  PRIMARY KEY (game_id, user_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create a function that updates the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to the tables
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_games_updated_at
BEFORE UPDATE ON games
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER game_players_updated_at
BEFORE UPDATE ON game_players
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();