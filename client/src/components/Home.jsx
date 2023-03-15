import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getRecipes,
	filterRecipesByTipeDiet,
	orderByName,
	orderByScore,
} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import styles from '../cssModule/Home.module.css';

export default function Home() {
	//se utiliza la constante para despachar las acciones
	const dispatch = useDispatch();
	//con el hook nos traemos todo lo que esta el estado recipes del reducer
	const allRecipes = useSelector((state) => state.recipes);

	// definir estados locales para mi paginado
	const [currentPage, setCurrentPage] = useState(1); //estado de la pagina actual y un estado que setee la pagina actual
	const [recipesPerPage, setRecipesPerPage] = useState(9); //define un estado de recetas por paginas y el readme pide 9
	const indexLastRecipe = currentPage * recipesPerPage; //1 * 9 = 9
	const indexFirtsRecipe = indexLastRecipe - recipesPerPage; // 9 - 9 = 0
	const currentRecipes = allRecipes.slice(indexFirtsRecipe, indexLastRecipe);

	const paginado = function (pageNumber) {
		setCurrentPage(pageNumber);
	};

	//definir estados para ordenar ascendente y descendente
	const [order, setOrder] = useState('');

	useEffect(() => {
		dispatch(getRecipes());
	}, [dispatch]);

	function handleClick(e) {
		e.preventDefault();
		dispatch(getRecipes());
	}

	//funcion para filtrar por tipo de dieta e === evento, e.target.value = es el valor de las option value
	function handleFilterTypeDiet(e) {
		e.preventDefault();
		dispatch(filterRecipesByTipeDiet(e.target.value));
		setCurrentPage(1);
	}

	// funcion para ordenar ascedente o descendente
	function handleOrderByName(e) {
		e.preventDefault();
		dispatch(orderByName(e.target.value));
		setCurrentPage(1);
		setOrder(`Ordenado${e.target.value}`);
	}

	// funcion para ordenar de mayor a menor
	function handleOrderByScore(e) {
		e.preventDefault();
		dispatch(orderByScore(e.target.value));
		setCurrentPage(1);
		setOrder(`Ordenado${e.target.value}`);
	}

	return (
		<div className={styles.bkg}>
			<Link to='/recipe'>Recipe Create</Link>
			<h1>Recipe List</h1>
			<button
				onClick={(e) => {
					handleClick(e);
				}}
			>
				Load All Recipes
			</button>
			<div>
				<select onChange={(e) => handleOrderByName(e)}>
					<option disabled selected>
						Order...By...Name
					</option>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>

				{/* le pasamos la propiedad con la funcion para tome los values y se despache la accion */}
				<select onChange={(e) => handleFilterTypeDiet(e)}>
					<option value='all'>All Recipes</option>
					<option value='gluten free'>Gluten Free</option>
					<option value='dairy free'>Dairy Free</option>
					<option value='lacto ovo vegetarian'>Lacto-Ovo-Vegetarian</option>
					<option value='vegan'>Vegan</option>
					<option value='paleolithic'>Paleolithic</option>
					<option value='primal'>Primal</option>
					<option value='pescatarian'>Pescatarian</option>
					<option value='fodmap friendly'>Fodmap Friendly</option>
					<option value='whole 30'>Whole30</option>
				</select>

				{/*  */}
				<select onChange={(e) => handleOrderByScore(e)}>
					<option disabled selected>
						Order...By...Score
					</option>
					<option value='minToMax'>From Min to Max</option>
					<option value='maxToMin'>From Max to Min</option>
				</select>

				<div>
					<Paginado
						recipesPerPage={recipesPerPage}
						allRecipes={allRecipes.length}
						paginado={paginado}
					/>
					<SearchBar />
				</div>

				<div>
					{currentRecipes?.map((e) => {
						return (
							<>
								<Link to={'/recipe/' + e.id}>
									<Card
										name={e.name}
										image={e.image}
										dietTypes={e.dietTypes}
										diets={e.diets}
										id={e.id}
									/>
								</Link>
							</>
						);
					})}
				</div>
			</div>
		</div>
	);
}
