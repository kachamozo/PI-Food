import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateRecipe from "./components/RecipeCreate";
import Details from "./components/Details";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
        {/*el swuitch sirve para machear los link en caso de colocar un link invalido machea con el ultimo valido ej: /home/cualquiercosa solo renderiza hasta home*/}
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/home" component={Home} />
                    <Route path="/recipe" component={CreateRecipe} />
                    <Route exact path="/recipes/:id" component={Details} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
