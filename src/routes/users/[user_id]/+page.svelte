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
			<div class="stat-value">200</div>
			<div class="stat-desc">Jan 1st - Feb 1st</div>
		</div>
	
		<div class="stat">
			<div class="stat-title">Number of games won</div>
			<div class="stat-value">4,200</div>
			<div class="stat-desc">↗︎ 400 (22%)</div>
		</div>
	
		<div class="stat">
			<div class="stat-title">Number of games lost</div>
			<div class="stat-value">1,200</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
		<div class="stat">
			<div class="stat-title">Number of games drawn</div>
			<div class="stat-value">1,200</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
		<div class="stat">
			<div class="stat-title">Date joined</div>
			<div class="stat-value">1,200</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
		<div class="stat">
			<div class="stat-title">Rank</div>
			<div class="stat-value">1,200</div>
			<div class="stat-desc">↘︎ 90 (14%)</div>
		</div>
	</div>

	<!-- history of all their games in chronological order -->
	<div id="user-game-history" class="overflow-x-auto">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th></th>
					<th>Played as</th>
					<th>Played against</th>
					<th>Result</th>
				</tr>
			</thead>
			<tbody>
				<!-- loop through all games and display table row -->
				{#each data?.games ?? [] as game, i}
					<tr>
						<td>{i + 1}</td>
						<td>{`${game.user_name} (${game.color})`}</td>
						<td>{`${game.opponent_name} (${game.opponent_color})`}</td>
						<td>{game.game_result}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>	
</div>
