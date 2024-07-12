import { generateMock } from '@anatine/zod-mock';
import type {
  User,
} from '$src/lib/schemas/schema';

import {
  UserSchema,
} from '$src/lib/schemas/schema';

const generateMockUser = (): User => {
  return generateMock(UserSchema);
}

export {
  generateMockUser,
}