async function Draw(setFunction: { (value: SetStateAction<{ id: number; image: string; name: string; stats: { base_stat: number; stat: { name: string; }; }[]; types: { slot: number; type: { name: string; }; }[]; }>): void; (value: SetStateAction<{ id: number; image: string; name: string; stats: { base_stat: number; stat: { name: string; }; }[]; types: { slot: number; type: { name: string; }; }[]; }>): void; (arg0: () => any): void; }, setIsFetched: { (value: SetStateAction<boolean>): void; (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) {
    const pokeId = Math.floor(Math.random() * 1010 + 1);
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokeId}/`;
    await fetch(pokemonUrl)
      .then(response => response.json())
      .then(data => {
        setIsFetched(true);
        setFunction(() => {
          return { ...data, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png` }
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  module.exports = Draw;