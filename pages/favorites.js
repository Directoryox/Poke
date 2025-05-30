import {getPokemonByName} from "../services/pokeapi.js";

export async function favorites(app) {
    const favs = JSON.parse(localStorage.getItem('favs') || '[]');
    app.innerHTML = `<h2>Избранные покемоны</h2>`;

    const pokemons = await Promise.all(favs.map(name => getPokemonByName(name)));

    const cards = pokemons.map(poke => `
        <div class="card">
        <a href="#/pokemons/${poke.id}">${poke.name}</a>
        <img src="${poke.sprites.front_default}" alt="${poke.name}"/>
        <p>ID: ${poke.id}</p>
        </div>
    `).join('');

    app.innerHTML = `
        <h2>Избранные покемоны</h2>
        <div class="grid">${cards}</div>
    `;
}
