<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>
<div>
	<h1 class="text-2xl font-bold m-2">Johnson</h1>

	<!-- summary stats about a single user -->
	<div
		class="
			stats
			lg:stats-horizontal
			shadow
			flex
			bg-primary
			text-primary-content
		"
	>
		<div class="stat">
			<div class="stat-title">Number of games played</div>
			<div class="stat-value">{data.games.length ?? 0}</div>
			<div class="stat-desc">Jan 1st - Feb 1st</div>
		</div>
	
		<div class="stat">
			<div class="stat-title">Number of games won</div>
			<div class="stat-value">{data.stats.gamesWon ?? 0}</div>
			<div class="stat-desc">↗︎ 400 (22%)</div>
		</div>
	
		<div class="stat">
			<div class="stat-title">Number of games lost</div>
			<div class="stat-value">{data.stats.gamesLost ?? 0}</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
		<div class="stat">
			<div class="stat-title">Number of games drawn</div>
			<div class="stat-value">{data.stats.gamesDrawn ?? 0}</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
		<div class="stat">
			<div class="stat-title">Date joined</div>
			<div class="stat-value">{data.stats.user.created_at}</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
		<div class="stat">
			<div class="stat-title">Rank</div>
			<div class="stat-value">{data.stats.user.rank}</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
	</div>

	<!-- history of all their games in chronological order -->
	<div id="user-game-history" class="overflow-x-auto">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th class="max-sm:hidden">Played as</th>
					<th>Played against</th>
					<th>Result</th>
				</tr>
			</thead>
			<tbody>
				<!-- loop through all games and display table row -->
				{#each data?.games ?? [] as game, i}
					<tr class={game.game_result === 'win' ? 'bg-success text-success-content' : game.game_result === 'loss' ? 'bg-error text-error-content' : ''}>
						<td class="max-sm:hidden">{`${game.users.name} (${game.color})`}</td>
						<td>{`${game.opponent_users.name} (${game.opponent_color})`}</td>
						<td>{game.game_result}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>	
</div>
