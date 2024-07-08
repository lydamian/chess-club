-- Insert two users
INSERT INTO users (name, email, status, rank)
VALUES 
('John Doe', 'john.doe@example.com', 'active'::user_status, 1500),
('Jane Doe', 'jane.doe@example.com', 'active'::user_status, 1500);

-- Get the ids of the inserted users
DO $$
DECLARE
  john_id UUID;
  jane_id UUID;
  john_rank INTEGER;
  jane_rank INTEGER;
BEGIN
  SELECT id, rank INTO john_id, john_rank FROM users WHERE name = 'John Doe';
  SELECT id, rank INTO jane_id, jane_rank FROM users WHERE name = 'Jane Doe';

  -- Insert 10 games played between John Doe and Jane Doe
  FOR i IN 1..10 LOOP
    IF i % 2 = 1 THEN
      -- John Doe wins
      INSERT INTO games (user_id, color, rank_start, rank_end, game_result, opponent_user_id, opponent_color, opponent_rank_start, opponent_rank_end, opponent_game_result)
      VALUES 
      (john_id, 'white'::player_color, john_rank, john_rank + 10, 'win'::game_result, jane_id, 'black'::player_color, jane_rank, jane_rank - 10, 'loss'::game_result),
      (jane_id, 'black'::player_color, jane_rank, jane_rank - 10, 'loss'::game_result, john_id, 'white'::player_color, john_rank, john_rank + 10, 'win'::game_result);

      -- Update ranks
      UPDATE users SET rank = john_rank + 10 WHERE id = john_id;
      UPDATE users SET rank = jane_rank - 10 WHERE id = jane_id;
    ELSE
      -- Jane Doe wins
      INSERT INTO games (user_id, color, rank_start, rank_end, game_result, opponent_user_id, opponent_color, opponent_rank_start, opponent_rank_end, opponent_game_result)
      VALUES 
      (john_id, 'white'::player_color, john_rank, john_rank - 10, 'loss'::game_result, jane_id, 'black'::player_color, jane_rank, jane_rank + 10, 'win'::game_result),
      (jane_id, 'black'::player_color, jane_rank, jane_rank + 10, 'win'::game_result, john_id, 'white'::player_color, john_rank, john_rank - 10, 'loss'::game_result);

      -- Update ranks
      UPDATE users SET rank = john_rank - 10 WHERE id = john_id;
      UPDATE users SET rank = jane_rank + 10 WHERE id = jane_id;
    END IF;

    -- Get the updated ranks
    SELECT rank INTO john_rank FROM users WHERE id = john_id;
    SELECT rank INTO jane_rank FROM users WHERE id = jane_id;
  END LOOP;
END $$;