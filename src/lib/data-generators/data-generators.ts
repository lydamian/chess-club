import { generateMock } from '@anatine/zod-mock';
import type {
  User,
  GameDetails,
} from '$src/lib/schemas/schema';

import {
  UserSchema,
  UserGameDetailsSchema,
} from '$src/lib/schemas/schema';

const generateMockUser = (): User => {
  return generateMock(UserSchema);
}

const generateGameDetails = (): GameDetails => {
  return generateMock(UserGameDetailsSchema);
}

export {
  generateMockUser,
  generateGameDetails,
}