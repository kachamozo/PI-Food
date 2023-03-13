const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db');
const api = require('./food.json');

// hacemos un pedido para traernos la informacion de la api
const getApiInfo = async () => {
	// lsconst apiUrl = await axios.get(
	// 	`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
	// );
	// const apiInfo = await apiUrl.data.results.map((e) => {
	const apiInfo = api.results.map((e) => {
		return {
			id: e.id,
			image: e.image,
			name: e.title,
			dietTypes: e.diets,
			score: e.spoonacularScore,
			healthScore: e.healthScore,
			summary: e.summary,
			dishTypes: e.dishTypes,
			steps: e.analyzedInstructions[0]?.steps.map((e) => {
				return {
					number: e.number,
					step: e.step,
				};
			}),
		};
	});
	return apiInfo;
};
// traemos la informacion de la base de datos
const getDbInfo = async () => {
	return await Recipe.findAll({
		include: {
			model: Diet,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});
};
// aqui unimos las 2 infos
const getAllRecipes = async () => {
	const apiInfo = await getApiInfo();
	const dbInfo = await getDbInfo();
	const infoTotal = [...apiInfo, ...dbInfo];
	return infoTotal;
};

// aqui empienza la ruta by Name
const getAll = async (req, res) => {
	const { name } = req.query;
	let recipesTotal = await getAllRecipes();
	if (name) {
		try {
			let recipesByName = recipesTotal.filter((e) =>
				e.name.toLowerCase().includes(name.toLowerCase())
			);
			console.log(recipesByName.length);
			if (recipesByName) res.status(200).send(recipesByName);
			else res.status(404).send('Sorry, repice not found');
		} catch (error) {
			return console.log(error);
		}
	} else {
		console.log(recipesTotal.length);
		res.status(200).send(recipesTotal);
	}
};

// aqui empieza la ruta by Id
const getById = async (req, res) => {
	const { idRecipe } = req.params;
	if (idRecipe.includes('-')) {
		try {
			let recipeDb = await Recipe.findOne({
				where: {
					id: idRecipe,
				},
				include: {
					model: Diet,
					attributes: ['name'],
					through: {
						attributes: [],
					},
				},
			});
			if (recipeDb) res.json(recipeDb);
			else res.status(404).send('Sorry, the recipe not found in database');
		} catch (error) {
			console.log(error);
		}
	} else {
		try {
			const response = await axios.get(
				` https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`
			);
			//tenemos q devolver lo que se renderiza en detalles del fronted
			return res.status(200).json({
				id: response.data.id,
				image: response.data.image,
				name: response.data.title,
				dietTypes: response.data.diets,
				score: response.data.spoonacularScore,
				healthScore: response.data.healthScore,
				summary: response.data.summary,
				dishTypes: response.data.dishTypes,
				steps: response.data.analyzedInstructions[0]?.steps.map((e) => {
					return {
						number: e.number,
						step: e.step,
					};
				}),
			});
		} catch (error) {
			console.log(error);
		}
	}
};

// ------> POST /recipe <-------
const create = async (req, res) => {
	try {
		const {
			name,
			image,
			summary,
			score,
			healthScore,
			steps,
			dietTypes,
			createdInDb,
		} = req.body;

		// creamos la receta
		const newRecipe = await Recipe.create({
			name,
			image,
			summary,
			score,
			healthScore,
			steps,
			createdInDb,
		});

		// creamos el tipo de dieta
		const dietTypesInDb = await Diet.findAll({
			where: { name: dietTypes },
		});

		// vinculamos la receta con el tipo de dieta
		newRecipe.addDiet(dietTypesInDb);

		res.status(200).send('recipe created successfully');
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
	getAll,
	getById,
	create,
};
