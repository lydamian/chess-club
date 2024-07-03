import { z } from 'zod';

const userStatusEnum = z.enum([
  'active',
  'inactive',
  'banned',
  'deleted'
]);

const Color = z.enum(['white', 'black']);
const Rank = z.number().int().gt(0).lt(4000);
const GameResult = z.enum(['win', 'loss', 'draw']);

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email_address: z.string().email(),
  rank: Rank.default(1500),
  status: userStatusEnum,
  created_at: z.date(),
  updated_at: z.date(),
});

const GameSchema = z.object({
  id: z.string().uuid(),
  metadata: z.object({}).optional(), // Assuming metadata is a JSON object
  winner_id: z.string().uuid(),
  winner_color: Color,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

const GamePlayer = z.object({
  game_id: z.string().uuid(),
  user_id: z.string().uuid(),
  color: Color,
  rank_at_time_of_play: z.number(),
  game_result: GameResult,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Combine the schemas to create the final schema
const UserGameDetailsSchema = GameSchema.extend({
  user_id: z.string().uuid(),
  user_name: z.string(),
  color: Color,
  rank_at_time_of_play: z.number(),
  game_result: GameResult,
  opponent_user_id: z.string().uuid(),
  opponent_name: z.string(),
  opponent_color: Color,
  opponent_rank_at_time_of_play: z.number(),
  opponent_game_result: GameResult,
});


// types inference
type User = z.infer<typeof UserSchema>
type Game = z.infer<typeof GameSchema>
type GameDetails = z.infer<typeof UserGameDetailsSchema>

export {
  UserSchema,
  GameSchema,
  GamePlayer,
  UserGameDetailsSchema,
}

export type {
  User,
  Game,
  GameDetails
}