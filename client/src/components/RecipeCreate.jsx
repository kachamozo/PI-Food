import React, { useEffect, useState } from "react"; //tb se puede importar de esta manera
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypeDiets, postRecipes } from "../actions/index";
import styles from "../cssModule/RecipeCreate.module.css";

export default function CreateRecipe() {
    const dispatch = useDispatch();
    let listDiets = useSelector((state) => state.typeDiets);
    console.log("esto es listDiets", listDiets);

    const [input, setInput] = useState({
        name: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        dietTypes: [],
    });

    useEffect(() => {
        dispatch(getTypeDiets());
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        console.log(input);
    }

    // function handleSelect(e){
    //     setInput({
    //         ...input,
    //         dietTypes:[...input.dietTypes, e.target.value]
    //     })
    // }

    function handleCheck(e) {
        if (e.target.checked && !input.dietTypes.includes(e.target.value)) {
            setInput({
                ...input,
                dietTypes: [...input.dietTypes, e.target.value],
            });
        } else if (!e.target.checked) {
            setInput({
                ...input,
                dietTypes: input.dietTypes.filter((d) => d !== e.target.value),
            });
        }
    }

    function handleScore() {}

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipes(input));
        alert("Congratulations you created a new recipe!");
        setInput({
            name: "",
            summary: "",
            score: "",
            healthScore: "",
            steps: "",
            typeDiets: [],
        });
    }
    return (
        <div>
            <Link to="/home">
                <button>Back to Home</button>
            </Link>
            <h1>Create your Recipe</h1>
            <h3>Los campos con * son obligatorios</h3>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>* name:</label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>
                <div>
                    <label>image:</label>
                    <input
                        type="text"
                        name="image"
                        value={input.image}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>

                <div>
                    <label>* summary:</label>
                    <input
                        type="text"
                        name="summary"
                        value={input.summary}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>
                <div>
                    <label>Score:</label>
                    <input
                        type="text"
                        name="score"
                        value={input.score}
                        placeholder="un numero entre 1 y 100"
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>
                <div>
                    <label>healthScore:</label>
                    <input
                        type="text"
                        name="healthScore"
                        placeholder="un numero entre 1 y 100"
                        value={input.healthScore}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>
                <div>
                    <label>step by step:</label>
                    <input
                        type="textarea"
                        name="steps"
                        value={input.steps}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>

                {/* <select onChange={(e) => handleSelect(e)} >
                    {listDiets?.map((e) => (
                     <option value={e.name}> {e.name} </option>
                    ))}
                    
                </select > */}

                <div>
                    <label>Diets: </label>
                    <br />
                    {listDiets.map((d) => (
                        <label htmlFor={d.name} key={d.name}>
                            <input
                                type="checkbox"
                                name={d.name}
                                value={d.name}
                                onChange={(e) => handleCheck(e)}
                            />
                            {d.name}
                        </label>
                    ))}
                </div>
                <button>Create Recipe</button>
            </form>
        </div>
    );
}
