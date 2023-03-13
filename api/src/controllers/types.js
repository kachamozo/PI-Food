const axios = require('axios');
const { Diet } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;
const api = require('./food.json');

const getTypes = async (req, res) => {
	const { count, rows } = await Diet.findAndCountAll();
	if (count > 0) {
		res.status(200).send(rows);
	} else {
		const infoApi = await axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
		);

		const infoDiets = await infoApi.data.results.map((e) => {
			// const apiInfo = api.results.map((e) => {
			return {
				dietType: e.diets,
			};
		});

		const dietList = await infoDiets.map((e) => e.dietType).flat(Infinity);
		// const dietList = await apiInfo.map((e) => e.dietType).flat(Infinity);

		const mySet = new Set(dietList);

		for (item of mySet) {
			await Diet.findOrCreate({
				where: {
					name: item,
				},
			});
		}
		const allDiets = await Diet.findAll();

		res.send(allDiets);
	}
};

module.exports = { getTypes };
