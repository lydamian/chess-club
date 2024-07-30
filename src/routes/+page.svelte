<script lang="ts">
  import GoldTrophy from '$src/components/gold-trophy.svelte'
  import SilverTrophy from '$src/components/silver-trophy.svelte'
  import BronzeTrophy from '$src/components/bronze-trophy.svelte'
  import type { PageData } from './$types';
	export let data: PageData;
</script>

<div>
  Games Played 
  <div class="badge badge-lg badge-secondary cursor-pointer">
    {`+${data.totalNumberOfGamesPlayed}`}
  </div>
</div>

<div class="px-0 md:px-4 lg:px-8">
  <!-- leaderboard -->
  <div class="overflow-x-auto">
    <table class="table table-lg">
      <!-- head -->
      <thead>
        <tr>
          <th>Place</th>
          <th>Name</th>
          <th>Rank</th>
          <th>Games played</th>
        </tr>
      </thead>
      <tbody>
        <!-- loop through all data.users -->
        {#each data.users as user, i}
          {@const pos = i + 1}

          <tr
            id={user.id}
            class={`
              ${pos === 1 ? 'bg-slate-300' : ''}
              ${pos === 2 ? 'bg-slate-200' : ''}
              ${pos === 3 ? 'bg-slate-100' : ''}
            `
            }
          >
            <!-- special rendering for the highest ranked user -->
            {#if pos === 1}
              <td>{pos}&nbsp<GoldTrophy class="inline text-lg" /></td>
            <!-- special rendering for the second highest ranked user -->
            {:else if pos === 2}
              <td>{pos}&nbsp<SilverTrophy class="inline text-lg" /></td>
            <!-- special rendering for the third highest ranked user -->
            {:else if pos === 3}
              <td>{pos}&nbsp<BronzeTrophy class="inline text-lg" /></td>
            {:else}
              <td>{pos}</td>
            {/if}
            <td>
              <a
                href={`users/${user.id}`}
                class="link link-primary"
              >
                {user.name}
              </a>
            </td>
            <td>{user.rank}</td>
            <td>{data?.gameCounts?.[user.id] ?? ''}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- @TODO: implement most recent n games played of all users -->
</div>