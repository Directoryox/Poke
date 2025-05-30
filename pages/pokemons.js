import { getPokemonList } from "../services/pokeapi.js";

export async function pokemonsPage(app) {
  app.innerHTML = `<h2>Loading pokemons...</h2>`;

  const data = await getPokemonList(50);
  const cards = data.results.map((poke, index) => `
    <div class="card" data-name="${poke.name}">
      <button class="bth_favorite" data-name="${poke.name}">Избранное</button>
      <a href="#/pokemons/${index + 1}">${poke.name}</a>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png" alt="${poke.name}"/>
      <p>ID ${index + 1}</p>
    </div>
  `).join('');

  app.innerHTML = `
    <form>
      <input id="search" placeholder="Найти покемона по имени" />
      <button id="search_btn" type="button">Найти</button>
    </form>
    <h2>Pokemons List</h2>
    <div class="grid">${cards}</div>
  `;

  const search_btn = document.getElementById('search_btn');
  const search = document.getElementById('search');
  const cards1 = document.querySelectorAll('.card');

  search_btn.addEventListener('click', () => {
  const searchname = search.value.toLowerCase();
  let found = false;

  cards1.forEach(el => {
    const name = el.dataset.name;
    if (name === searchname) {
        el.querySelector('a').click()
        found = true;
    }
  });

  if (!found) {
      alert("Пакемон не найден");
  }
});

  document.querySelectorAll('.bth_favorite').forEach(btn => {
      btn.onclick = () => {
          const name = btn.dataset.name;
          const favs = JSON.parse(localStorage.getItem('favs') || '[]');

          if (!favs.includes(name)) {
              favs.push(name);
              localStorage.setItem('favs', JSON.stringify(favs));
              alert(`${name} добавлен в избранное`);
          } else {
              alert(`${name} уже в избранном`);
          }
      };
  });
}

