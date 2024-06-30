import { z } from 'zod';

const userStatusEnum = z.enum([
  'active',
  'inactive',
  'banned',
  'deleted'
]);

const Color = z.enum(['white', 'black']);

const Rank = z.number().int().gt(0).lt(4000);

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email_address: z.string().email(),
  rank: Rank.default(1500),
  status: userStatusEnum,
  created_at: z.date(),
  updated_at: z.date(),
});


const gameMetadataSchema = z.object({
  white: z.string().uuid(),
  black: z.string().uuid(),
});

const gameSchema = z.object({
  id: z.string().uuid(),
  user_1_id: z.string(),
  user_2_id: z.string(),
  metadata: gameMetadataSchema.optional(),
  user_1_color: Color,
  user_2_color: Color,
  user_1_start_rank: Rank,
  user_2_start_rank: Rank,
  winner_id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

// types inference
type User = z.infer<typeof userSchema>
type Game = z.infer<typeof gameSchema>

export {
  userSchema,
  gameSchema,
}

export type {
  User,
  Game,
}