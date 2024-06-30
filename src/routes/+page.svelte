<script lang="ts">
  import {
    generateMockGame,
    generateMockUser,
  } from '$lib/data-generators/data-generators';

  const data = {
    // GET /api/users
    users: Array.from({ length: 10 }, (_, i) => (generateMockUser())),
  }
</script>

<div class="px-4 sm:px-6 lg:px-8">
  <!-- leaderboard -->
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <!-- <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Rank</th>
        </tr>
      </thead> -->
      <tbody>
        <!-- loop through all data.users -->
        {#each data.users as user, i}
          <tr id={user.id}>
            <td>{i}</td>
            <td>{user.name}</td>
            <td>{user.rank}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- @TODO: implement most recent n games played of all users -->
</div>