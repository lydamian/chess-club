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