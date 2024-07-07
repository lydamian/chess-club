# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Resources
- Authentication
  - https://supabase.com/docs/guides/auth/server-side/sveltekit


## Getting started
Insert mock data
```
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
```