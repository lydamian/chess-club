<script lang="ts">
  import { generateMockGame, generateMockUser } from '$lib/data-generators/data-generators';

  const data = {
    // GET /api/users
    users: Array.from({ length: 10 }, (_, i) => generateMockUser()),
  };
</script>

View all information about all users in a tabular format
Be able to search a user, I actually think i may not need this (since it should be on the leaderboard)
