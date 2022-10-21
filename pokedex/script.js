const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = []; // empty array of promises
    for (let i = 1; i <= 150; i++) { //less than 150 pokemon 
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`; // the i is a variable 
        promises.push(fetch(url).then((res) => res.json())); //promises helps to run them in parallel instead of sequantial.Lesser runtime. line 7 shows that for each of the request, the promises will push to a list of promises
    }
    Promise.all(promises).then((results) => { // promise.all will asynchronous calls to run in parallel, when its done it will trigger .then , then can access the array of the results
        const pokemon = results.map((result) => ({ //maps help to converting the array into their specific catergory. The line 10 (results.map) this helps to catergorize the results data into their specific catergory (The format that I choose is Name, Image, Type, Id). Eg. Name: Pikachu, Type: Eletric
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();