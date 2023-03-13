import React from "react";
import styles from "../cssModule/Paginado.module.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
    const pageNumbers = []; //[1,2,3,4,5,...]

    for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i + 1);
    }

    // lista que se va renderizar
    return (
        <nav>
            <ul className={styles.ul}>
                {pageNumbers?.map((n) => {
                    return (
                        <li>
                            <a
                                className={styles.container}
                                onClick={() => paginado(n)}
                            >
                                {n}{" "}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
