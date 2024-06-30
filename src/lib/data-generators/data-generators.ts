import { generateMock } from '@anatine/zod-mock';
import type {
  User,
  Game
} from '$src/lib/schemas/schema';

import {
  userSchema,
  gameSchema
} from '$src/lib/schemas/schema';

const generateMockUser = (): User => {
  return generateMock(userSchema);
}

const generateMockGame = (
  userId1: string,
  userId2: string
): Game => {
  return {
    ...generateMock(gameSchema),
    user_1_id: userId1,
    user_2_id: userId2,
  };
}

export {
  generateMockUser,
  generateMockGame
}