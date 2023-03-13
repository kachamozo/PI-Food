const initialState = {
    recipes: [],
    allRecipes: [],
    typeDiets: [],
    details: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_RECIPES":
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            };

        case "GET_NAME_RECIPES":
            return {
                ...state,
                recipes: action.payload,
            };

        case "FILTER_BY_TYPEDIET":
            const allRecip = state.allRecipes;
            const apiInfo = allRecip.filter((e) => e.dietTypes);
            const dbInfo = allRecip.filter((e) => e.diets);

            const dbInfoPayload = dbInfo.filter((e) =>
                e.diets.find((t) => t.name === action.payload)
            );
            const apiInfoPayload = apiInfo.filter((e) =>
                e.dietTypes.find((t) => t === action.payload)
            );
            const infoTotal = [...apiInfoPayload, ...dbInfoPayload];
            console.log("esto es allrecipes" + allRecip);

            const typeDietFiltered =
                action.payload === "all" ? allRecip : infoTotal;

            console.log(typeDietFiltered);
            return {
                ...state,
                recipes: typeDietFiltered,
            };

        case "ORDER_BY_NAME":
            const order =
                action.payload === "asc"
                    ? state.recipes.sort(function (a, b) {
                          if (a.name.toLowerCase() > b.name.toLowerCase()) {
                              return 1;
                          }
                          if (b.name.toLowerCase() > a.name.toLowerCase()) {
                              return -1;
                          }
                          return 0;
                      })
                    : state.recipes.sort(function (a, b) {
                          if (a.name.toLowerCase() > b.name.toLowerCase()) {
                              return -1;
                          }
                          if (b.name.toLowerCase() > a.name.toLowerCase()) {
                              return 1;
                          }
                          return 0;
                      });
            return {
                ...state,
                recipes: order,
            };

        case "ORDER_BY_SCORE":
            const orderToMax =
                action.payload === "minToMax"
                    ? state.recipes.sort(function (a, b) {
                          if (a.score > b.score) return 1;
                          if (b.score > a.score) return -1;
                          return 0;
                      })
                    : state.recipes.sort(function (a, b) {
                          if (a.score > b.score) return -1;
                          if (b.score > a.score) return 1;
                          return 0;
                      });
            return {
                ...state,
                recipes: orderToMax,
            };
        case "GET_TYPE_DIETS":
            return {
                ...state,
                typeDiets: action.payload,
            };

        case "POST_RECIPE":
            return {
                ...state,
            };

        case "GET_BY_ID":
            return {
                ...state,
                details: action.payload,
            };

        default:
            return state;
    }
}

export default rootReducer;
