we need the ability to create admin user's to
be able to edit a user's score

player
- id uuid auto generated
- name
- joined_at (date)
- email
- score
- status (active, inactive, banned, deleted)
- rank (default 1500)

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
