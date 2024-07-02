import { generateMock } from '@anatine/zod-mock';
import type {
  User,
  Game,
} from '$src/lib/schemas/schema';

import {
  UserSchema,
  GameSchema,
} from '$src/lib/schemas/schema';

const generateMockUser = (): User => {
  return generateMock(UserSchema);
}

const generateMockGame = (
  userId1: string,
  userId2: string
): Game => {
  return {
    ...generateMock(GameSchema),
  };
}

// const generateMockGameJoinUsers = (
//   userId1: string,
//   userId2: string
// ): Game => {
//   return {
//     ...generateMock(gameJoinUsersSchema),
//     user_1_id: userId1,
//     user_2_id: userId2,
//   };
// }

export {
  generateMockUser,
  generateMockGame,
  // generateMockGameJoinUsers,
}