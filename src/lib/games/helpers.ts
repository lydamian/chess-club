
const get_game_result_for_user = (
	user_id: string,
	game_result: string
): string => {
	if (game_result === user_id) {
		return 'win';
	}
	if (game_result === 'draw') {
		return 'draw';
	}
	return 'loss';
}

const convert_game_result_to_number = (
	game_result: string
): number => {
	if (game_result === 'win') {
		return 1;
	}
	if (game_result === 'draw') {
		return 0.5;
	}
	return 0;
}

export {
  get_game_result_for_user,
  convert_game_result_to_number,
}