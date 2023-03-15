import axios from 'axios';

export function getRecipes() {
	return async function (dispatch) {
		const json = await axios.get('http://localhost:3001/recipes');
		return dispatch({
			type: 'GET_RECIPES',
			payload: json.data,
		});
	};
}
// al payload se le puede nombrar de cualquier manera
export function getNameRecipes(name) {
	return async function (dispatch) {
		try {
			const json = await axios.get(
				`http://localhost:3001/recipes?name=${name}`
			);
			return dispatch({
				type: 'GET_NAME_RECIPES',
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getTypeDiets() {
	return async function (dispatch) {
		const json = await axios.get(`http://localhost:3001/types`);
		console.log(json.data);
		return dispatch({
			type: 'GET_TYPE_DIETS',
			payload: json.data,
		});
	};
}

export function postRecipes(payload) {
	return async function (dispatch) {
		var json = await axios.post(`http://localhost:3001/recipes`, payload);
		return json;
	};
}

export function filterRecipesByTipeDiet(payload) {
	return {
		type: 'FILTER_BY_TYPEDIET',
		payload,
	};
}

export function orderByName(payload) {
	return {
		type: 'ORDER_BY_NAME',
		payload,
	};
}

export function orderByScore(payload) {
	return {
		type: 'ORDER_BY_SCORE',
		payload,
	};
}

// par utilizar la ruta del id
export function getRecipesById(id) {
	return async function (dispatch) {
		var json = await axios.get(`http://localhost:3001/recipes/${id}`);
		return dispatch({
			type: 'GET_BY_ID',
			payload: json.data,
		});
	};
}
