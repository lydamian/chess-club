we need the ability to create admin user's to
be able to edit a user's score

user
- id uuid auto generated
- name text unique
- email text unique
- status (active, inactive, banned, deleted)
- rank (default 1500)
- created_at (date)

games
- player_1_id
- player_2_id
- metadata (json)
  - snapshot of each user and their ranking at the time of the game
  - what color each person playd
- winner_id
- played_at (date)
- created_at
- updated_at


players play a game and submit the game results

so i think we just need a way to create players
a way for an admin to edit a player's score, thats all?

what about if one of the admin's are missing, how do we know who played the game?
what if we allowd users to create games and submit the results, then we can have a way to track who played the game


--- features
/
  -> leaderboard
  -> show top 10 sorted by date joined, (default by rank)
  -> return all users to the client but have the client paginate on the
  client side
  -> also have a feature to welcome the newest person (mabye a newsletter?)
    -> have an admin login button, if the admin is logged in then...
      -> on the homepage have a create game button
        -> on click go to the /admin page below
/admin
  -> feature to insert a game for a user
    -> dropdown of all players, if a player is not shown the an ability to create a user embedded within the form

-> also we need a discord integration and channel so that user's can
submit games that we might have not recorded and an admin can
add it asyncly


in the leaderboard can we also create a row for the number
and for the first, second, and third position lets add a gold trophy, silver, and bronze respectively



---- features v2
- if i am going on the website as a regular player i want to see whos at the top of the leaderboard,
then i want to be able to search for my own position on the leaderboard by my name
- If i played a game and no admins were there to record the game then I want a way to submit a game
asynchronously (via discord most likely, so we kind of treat this like a zendesk ticket in corporate america)
  - timestamp of when i played
  - what i played as
  - who i played against
  - outcome of the game

- I also want to know all my stats and the archive of all my games
  - stats
     - games played
     - games won
     - games lost 
     - games drawn
      - date joined
      - rank
    - Archive of all my game played in chronological order desc
- As an admin
  - I need to submit some games, edit games, delete games (CRUD)
  - I also need to create users, edit users, delete users (CRUD)

- can you retroactively update games or scores? How is rank calculated?
  - Use this library https://www.npmjs.com/package/@echecs/elo?activeTab=readme

- I can only delete a user if they have no cascading effects, otherwise I can only set their account as inactive, which means
i cant submit new games for them but all their old games are still active
- If I update or delete a game, that is fine, but I will need to rerun a calculation of all scores for
  both users in the game, to recalcualte their score, (but then doens't this effect the score of all users i played against too?)
  - in this case i should probably not allow myself to delete games, or I can just delete games and ignore the current score

For now lets just allow inserting games, and dont worry about mutting just yet...




Trophy icon https://icon-sets.iconify.design/noto/trophy/


import { z } from 'zod';

// Define the Game schema
const GameSchema = z.object({
  id: z.string().uuid(),
  metadata: z.object({}).optional(), // Assuming metadata is a JSON object
  winner_id: z.string().uuid(),
  winner_color: z.enum(['white', 'black']),
  played_at: z.string().datetime(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Define the Player schema
const PlayerSchema = z.object({
  game_id: z.string().uuid(),
  user_id: z.string().uuid(),
  color: z.enum(['white', 'black']),
  rank_start: z.number(),
});

// Define the Opponent schema by prepending 'opponent_' to the Player schema fields
const OpponentSchema = PlayerSchema.extend({
  opponent_game_id: PlayerSchema.shape.game_id,
  opponent_user_id: PlayerSchema.shape.user_id,
  opponent_color: PlayerSchema.shape.color,
  opponent_rank_start: PlayerSchema.shape.rank_start,
}).omit({
  game_id: true,
  user_id: true,
  color: true,
  rank_start: true,
});

// Combine the schemas to create the final schema
const UserGameDetailsSchema = GameSchema.extend({
  player: PlayerSchema,
  opponent: OpponentSchema,
});

export { UserGameDetailsSchema };


SELECT
    u.name AS user_name,
    gp.rank_start AS user_rank_start,
    gp.color AS user_color,
    opponent.id AS opponent_id,
    opponent.name AS opponent_name,
    opponent_gp.color AS opponent_color,
    opponent_gp.rank_start AS opponent_rank_start,
    CASE
        WHEN games.winner_id = gp.user_id THEN 'win'
        WHEN games.winner_id = opponent_gp.user_id THEN 'loss'
        ELSE 'draw'
    END AS result,
    games.created_at
FROM
    game_players gp
    JOIN users u ON gp.user_id = u.id
    JOIN games ON gp.game_id = games.id
    JOIN game_players opponent_gp ON games.id = opponent_gp.game_id AND gp.user_id <> opponent_gp.user_id
    JOIN users opponent ON opponent_gp.user_id = opponent.id
WHERE
    gp.user_id = 'your_user_id_here'
ORDER BY
    games.created_at DESC;

Mabye I should also keep track of the new scores for each user after the game was played but i will deal with that later


Given this postgres schema, please help me generate some fake data.
Let me explain how this data model works.

We have users stored in the users table.
we can store games which have a one to many relationship with game_players.
We are generally using this for a chess ranking app, so 1 game will generally map to two game_players rows where there will be one winner denoted by the game_players.game_result and game_players.colors should be unique.

Can we create two users named John Doe and Jane Doe.
Lets create 3 games between there where john doe wins 1 and jane doe wins 2. They should both start at rank 1500, and a game win should update their rank +10 and a loss should decrease there rank -10.



-- Insert two users
INSERT INTO users (name, email, status, rank)
VALUES 
('John Doe', 'john.doe@example.com', 'active'::user_status, 1500),
('Jane Doe', 'jane.doe@example.com', 'active'::user_status, 1500);

-- Insert three games
INSERT INTO games (metadata)
VALUES 
('{}'),
('{}'),
('{}');

-- Get the IDs of the users and games
WITH john_doe AS (
  SELECT id FROM users WHERE name = 'John Doe'
),
jane_doe AS (
  SELECT id FROM users WHERE name = 'Jane Doe'
),
game1 AS (
  SELECT id FROM games LIMIT 1 OFFSET 0
),
game2 AS (
  SELECT id FROM games LIMIT 1 OFFSET 1
),
game3 AS (
  SELECT id FROM games LIMIT 1 OFFSET 2
)
-- Insert game players
INSERT INTO game_players (game_id, user_id, color, rank_start, rank_end, game_result)
SELECT game1.id, john_doe.id, 'white'::player_color, 1500, 1490, 'loss'::game_result FROM game1, john_doe
UNION ALL
SELECT game1.id, jane_doe.id, 'black'::player_color, 1500, 1510, 'win'::game_result FROM game1, jane_doe
UNION ALL
SELECT game2.id, john_doe.id, 'white'::player_color, 1490, 1500, 'win'::game_result FROM game2, john_doe
UNION ALL
SELECT game2.id, jane_doe.id, 'black'::player_color, 1510, 1500, 'loss'::game_result FROM game2, jane_doe
UNION ALL
SELECT game3.id, john_doe.id, 'white'::player_color, 1500, 1490, 'loss'::game_result FROM game3, john_doe
UNION ALL
SELECT game3.id, jane_doe.id, 'black'::player_color, 1500, 1510, 'win'::game_result FROM game3, jane_doe;

-- Update the users' ranks
UPDATE users SET rank = 1490 WHERE name = 'John Doe';
UPDATE users SET rank = 1510 WHERE name = 'Jane Doe';