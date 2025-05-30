import {homePage} from "./pages/home.js";
import {pokemonsPage} from "./pages/pokemons.js";
import {pokemonDetailsPage} from "./pages/pokemonDetails.js";
import {aboutPage} from "./pages/about.js";
import {favorites} from "./pages/favorites.js";

const app = document.getElementById('app');

export function router() {
    const hash = window.location.hash || '#/home';
    const parts = hash.split('/');
    const route = parts[1] || 'home';
    const id = parts[2];

    switch (route) {
        case 'home': 
            homePage(app); 
            break;
        case 'pokemons':
            if (id) {
                pokemonDetailsPage(app, id);
            } else {
                pokemonsPage(app);
            }
            break;
        case 'about': 
            aboutPage(app); 
            break;
        case 'favorites': 
            favorites(app); 
            break;
        default:
            app.innerHTML = `<h2>404 - NOT FOUND!!!</h2>`;
    }
}