import React from "react";
import { getRecipesById } from "../actions/index";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../cssModule/Details.module.css";

export default function Detail(props) {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipesById(id));
    }, [dispatch]);

    const detailsRecipe = useSelector((state) => state.details);
    console.log("estos son los detalles", detailsRecipe);

    return (
        <div className={styles.bkg} key={detailsRecipe.id}>
            <Link to="/home">
                <button>Back to main Page </button>{" "}
            </Link>
            <h1> {detailsRecipe.name} </h1>
            <img
                src={
                    detailsRecipe.image
                        ? detailsRecipe.image
                        : "https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg"
                }
            />
            {/* <h3>
                Type Diet:{" "}
                {detailsRecipe.dietTypes
                    ? detailsRecipe.dietTypes.map((e) => <li>{e}</li>)
                    : detailsRecipe.diets.map((e) => <li>{e.name}</li>)}
            </h3> */}

            <h4>
                Dish Type:
                {detailsRecipe.dishTypes
                    ? detailsRecipe.dishTypes.map((e) => <li>{e}</li>)
                    : "dish type not found"}
            </h4>
            <h5>summary: {detailsRecipe.summary}</h5>
            <h5>healthScore: {detailsRecipe.healthScore}</h5>
            <h5>score: {detailsRecipe.score}</h5>
            <h5>
                steps:
                {Array.isArray(detailsRecipe.steps)
                    ? detailsRecipe.steps.map((e) => (
                          <ul>
                              <li>{"step " + e.number}</li>
                              <li>{e.step}</li>
                          </ul>
                      ))
                    : detailsRecipe.steps}
            </h5>
        </div>
    );
}
