import { z } from 'zod';

const userStatusEnum = z.enum([
  'active',
  'inactive',
  'banned',
  'deleted'
]);

const ColorSchena = z.enum(['white', 'black']);
const RankSchema = z.number().int().gt(0).lt(4000);
const GameResultSchema = z.enum(['win', 'loss', 'draw']);

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  rank: RankSchema.default(1500),
  status: userStatusEnum,
  created_at: z.date(),
  updated_at: z.date(),
});

const GameSchema = z.object({
  id: z.string().uuid(),
  metadata: z.object({}).optional(), // Assuming metadata is a JSON object
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

const GamePlayer = z.object({
  game_id: z.string().uuid(),
  user_id: z.string().uuid(),
  color: ColorSchena,
  rank_start: z.number(),
  game_result: GameResultSchema,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Combine the schemas to create the final schema
const UserGameDetailsSchema = GameSchema.extend({
  user_id: z.string().uuid(),
  user_name: z.string(),
  color: ColorSchena,
  rank_start: z.number(),
  game_result: GameResultSchema,
  opponent_user_id: z.string().uuid(),
  opponent_name: z.string(),
  opponent_color: ColorSchena,
  opponent_rank_start: z.number(),
  opponent_game_result: GameResultSchema,
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
  ColorSchena,
  RankSchema,
  GameResultSchema
}

export type {
  User,
  Game,
  GameDetails
}