const STORAGE_KEY = 'recentPokemons';

export function addRecentPokemon() {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (!list.includes(name)) {
        list.unshift(name);
        if (list.length > 5) {
            list.pop();
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
}