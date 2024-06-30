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