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

const GamesSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  color: ColorSchena,
  rank_start: z.number().int().nullable(),
  rank_end: z.number().int().nullable(),
  game_result: GameResultSchema,
  opponent_user_id: z.string().uuid(),
  opponent_color: ColorSchena,
  opponent_rank_start: z.number().int().nullable(),
  opponent_rank_end: z.number().int().nullable(),
  opponent_game_result: GameResultSchema,
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

// types inference
type User = z.infer<typeof UserSchema>
type Games = z.infer<typeof GamesSchema>

export {
  UserSchema,
  ColorSchena,
  RankSchema,
  GamesSchema,
}

export type {
  User,
  Games,
}