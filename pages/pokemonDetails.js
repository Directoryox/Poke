import { getPokemonById } from "../services/pokeapi.js";
import { addRecentPokemon } from "../storage/recent.js";

export async function pokemonDetailsPage(app, id) {
    app.innerHTML = `<h2>Loading pokemon...</h2>`;

    const existPokemon = await getPokemonById(id);
    addRecentPokemon(existPokemon.name);

    const typeUrl = existPokemon.types[0].type.url;
    const typeRes = await fetch(typeUrl);
    const typeData = await typeRes.json();
    const doubleDamageFrom = typeData.damage_relations.double_damage_from.map(t => t.name).join(", ");

    app.innerHTML = `
        <h2>${existPokemon.name}</h2>
        <img src="${existPokemon.sprites.front_default}" alt="${existPokemon.name}" />
        <img src="${existPokemon.sprites.back_default}" alt="${existPokemon.name}" />
        <img src="${existPokemon.sprites.back_shiny}" alt="${existPokemon.name}" />
        <img src="${existPokemon.sprites.front_shiny}" alt="${existPokemon.name}" />
        <p>Weight: ${existPokemon.weight}</p>
        <p>Height: ${existPokemon.height}</p>
        <p>First letter of name: ${existPokemon.species.name[0]}</p>
        <p>Url: ${existPokemon.species.url}</p>
        <p>Slot: ${existPokemon.abilities[0].slot}</p>
        <p>Base_experience: ${existPokemon.base_experience}</p>
        <p>Level_learned_at: ${existPokemon.moves[0].version_group_details[0].level_learned_at}</p>
        <p>Species: ${existPokemon.species.name}</p>
        <p>HP: ${existPokemon.stats[0].base_stat}</p>
        <p>Effort: ${existPokemon.stats[0].effort}</p>
        <p>Attack: ${existPokemon.stats[3].base_stat}</p>
        <p>Defense: ${existPokemon.stats[5].base_stat}</p>
        <p>Types: ${existPokemon.types[0].type.name}</p>
        <p>Double damage From: ${doubleDamageFrom}</p>
        <p>Abilities: ${existPokemon.abilities[0].ability.name}</p>
        <button id="Playcry">Play cry</button>
        <a href="#/pokemons" class="back">Back to pokemons</a>
    `;

    document.getElementById("Playcry").onclick = () => {
        const audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${existPokemon.id}.ogg`);
        audio.play();
    };
}
